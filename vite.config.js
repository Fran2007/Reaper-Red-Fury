import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function isHttpUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function devStripeCheckoutApi(secretKey) {
  return {
    name: "dev-stripe-checkout-api",
    configureServer(server) {
      server.middlewares.use("/api/create-checkout-session", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        if (!secretKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY in .env" }));
          return;
        }

        try {
          let raw = "";
          req.on("data", (chunk) => {
            raw += chunk;
          });

          await new Promise((resolve, reject) => {
            req.on("end", resolve);
            req.on("error", reject);
          });

          const { items = [], successUrl, cancelUrl } = JSON.parse(raw || "{}");
          if (!Array.isArray(items) || items.length === 0) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Items are required" }));
            return;
          }

          const payload = new URLSearchParams({ mode: "payment" });
          payload.append("success_url", successUrl);
          payload.append("cancel_url", cancelUrl);

          items.forEach((item, i) => {
            payload.append(
              `line_items[${i}][price_data][currency]`,
              item.currency || "usd",
            );
            payload.append(
              `line_items[${i}][price_data][unit_amount]`,
              String(item.unitAmount),
            );
            payload.append(
              `line_items[${i}][price_data][product_data][name]`,
              item.name,
            );
            payload.append(
              `line_items[${i}][price_data][product_data][description]`,
              item.description || "",
            );
            if (isHttpUrl(item.image)) {
              payload.append(
                `line_items[${i}][price_data][product_data][images][0]`,
                item.image,
              );
            }
            payload.append(`line_items[${i}][quantity]`, String(item.quantity || 1));
          });

          const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${secretKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload.toString(),
          });

          const data = await stripeResponse.json();
          res.statusCode = stripeResponse.status;
          res.setHeader("Content-Type", "application/json");

          if (!stripeResponse.ok) {
            res.end(
              JSON.stringify({
                error: data.error?.message || "Failed to create Stripe checkout session",
              }),
            );
            return;
          }

          res.end(JSON.stringify({ id: data.id, url: data.url }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Unknown server error",
            }),
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), devStripeCheckoutApi(env.STRIPE_SECRET_KEY)],
  };
});
