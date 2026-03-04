const STRIPE_API_BASE = "https://api.stripe.com/v1";

function isHttpUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }),
    };
  }

  try {
    const { items = [], successUrl, cancelUrl } = JSON.parse(event.body || "{}");
    if (!Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Items are required" }),
      };
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

    const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: data.error?.message || "Failed to create Stripe checkout session",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id: data.id, url: data.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown server error",
      }),
    };
  }
}
