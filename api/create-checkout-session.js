const STRIPE_API_BASE = "https://api.stripe.com/v1";

function toFormBody(payload) {
  return new URLSearchParams(payload).toString();
}

function isHttpUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function buildLineItems(items) {
  const payload = {};

  items.forEach((item, i) => {
    payload[`line_items[${i}][price_data][currency]`] = item.currency || "usd";
    payload[`line_items[${i}][price_data][unit_amount]`] = String(item.unitAmount);
    payload[`line_items[${i}][price_data][product_data][name]`] = item.name;
    payload[`line_items[${i}][price_data][product_data][description]`] =
      item.description || "";

    if (isHttpUrl(item.image)) {
      payload[`line_items[${i}][price_data][product_data][images][0]`] = item.image;
    }

    payload[`line_items[${i}][quantity]`] = String(item.quantity || 1);
  });

  return payload;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
    return;
  }

  try {
    const { items = [], successUrl, cancelUrl } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Items are required" });
      return;
    }

    const payload = {
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...buildLineItems(items),
    };

    const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: toFormBody(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status).json({
        error: data.error?.message || "Failed to create Stripe checkout session",
      });
      return;
    }

    res.status(200).json({ id: data.id, url: data.url });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error",
    });
  }
}
