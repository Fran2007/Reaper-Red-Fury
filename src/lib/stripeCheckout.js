import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const CHECKOUT_API_URL =
  import.meta.env.VITE_STRIPE_CHECKOUT_API_URL || "/api/create-checkout-session";

const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null);

function toAbsoluteImageUrl(image) {
  if (!image) return "";
  try {
    return new URL(image, window.location.origin).toString();
  } catch {
    return "";
  }
}

function normalizeCartItems(cart = []) {
  return cart.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    image: toAbsoluteImageUrl(item.image),
    quantity: Math.max(1, Number(item.quantity) || 1),
    unitAmount: Math.round((Number(item.price) || 0) * 100),
    currency: "usd",
  }));
}

export async function createCheckoutSession(cart) {
  const items = normalizeCartItems(cart);
  if (!items.length) {
    throw new Error("El carrito esta vacio.");
  }

  const response = await fetch(CHECKOUT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      successUrl: `${window.location.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/checkout?cancelled=1`,
    }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";
    let message = "Error creando la sesion de pago.";

    if (contentType.includes("application/json")) {
      const body = await response.json();
      message = body.error || body.message || message;
    } else {
      const text = await response.text();
      if (text) message = text;
    }

    throw new Error(message);
  }

  const data = await response.json();
  if (data.url) return data.url;

  if (data.id) {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error(
        "Configura VITE_STRIPE_PUBLISHABLE_KEY para usar sessionId en Stripe Checkout.",
      );
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
    if (error) throw new Error(error.message);
    return null;
  }

  throw new Error(
    "Respuesta invalida del backend de checkout. Se esperaba 'url' o 'id'.",
  );
}
