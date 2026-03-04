import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { createCheckoutSession } from "../lib/stripeCheckout";
import { motion } from "framer-motion";
import PageBackground from "../Components/PageBackground";

function CheckoutPage({ success, cancelled }) {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isSuccess = success || searchParams.get("session_id");
  const isCancel = cancelled || searchParams.get("cancelled") === "1";
  useEffect(() => {
    if (isSuccess) clearCart();
  }, [isSuccess, clearCart]);

  useEffect(() => {
    if (!isSuccess && !isCancel && cart.length === 0) {
      navigate("/carrito", { replace: true });
    }
  }, [cart.length, isCancel, isSuccess, navigate]);

  const handlePayWithStripe = async () => {
    if (cart.length === 0) {
      navigate("/carrito");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const url = await createCheckoutSession(cart);
      if (url) window.location.href = url;
    } catch (e) {
      setError(e.message || "No se pudo iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <PageBackground className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg px-4"
        >
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔥</div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            ¡Pago realizado!
          </h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            {" "}
            Gracias por tu compra. Te hemos enviado el resumen por email (si lo
            configuraste en Stripe).{" "}
          </p>{" "}
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-500 px-6 sm:px-8 py-3 rounded-xl font-semibold transition text-sm sm:text-base"
          >
            {" "}
            Volver al inicio{" "}
          </Link>
        </motion.div>{" "}
      </PageBackground>
    );
  }
  if (isCancel) {
    return (
      <PageBackground className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
        {" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-lg px-4"
        >
          {" "}
          <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Pago cancelado
          </h1>{" "}
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            No te preocupes, tu carrito sigue intacto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            {" "}
            <Link
              to="/carrito"
              className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition text-sm sm:text-base"
            >
              {" "}
              Ver carrito{" "}
            </Link>{" "}
            <Link
              to="/#productos"
              className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-semibold transition text-sm sm:text-base"
            >
              {" "}
              Seguir comprando{" "}
            </Link>{" "}
          </div>
        </motion.div>{" "}
      </PageBackground>
    );
  }

  if (cart.length === 0) {
    return null;
  }

  return (
    <PageBackground className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
          Checkout
        </h1>
        <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base">
          Elige cómo quieres pagar
        </p>
        <div className="rounded-xl bg-black/40 border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            Resumen del pedido
          </h2>
          <ul className="space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
            {cart.map((item, i) => (
              <li key={i} className="flex justify-between text-gray-300 gap-2">
                <span className="min-w-0 truncate">
                  {item.name} × {item.quantity || 1}
                </span>
                <span className="shrink-0">
                  $
                  {((Number(item.price) || 0) * (item.quantity || 1)).toFixed(
                    2,
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-lg sm:text-xl font-bold border-t border-white/10 pt-3 sm:pt-4">
            <span>Total</span>
            <span className="text-orange-400">$ {cartTotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-indigo-500/50 bg-indigo-500/10 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-500/30 flex items-center justify-center font-bold text-sm sm:text-base"></div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base">Stripe</h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Tarjeta, Apple Pay, Google Pay
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePayWithStripe}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 font-semibold transition text-sm sm:text-base"
            >
              {loading ? "Redirigiendo a Stripe…" : "Pagar con Stripe"}{" "}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-xs sm:text-sm text-center">
              {error}
            </p>
          )}
        </div>
        <Link
          to="/carrito"
          className="block text-center text-gray-400 hover:text-white mt-6 sm:mt-8 text-xs sm:text-sm"
        >
          ← Volver al carrito
        </Link>
      </div>
    </PageBackground>
  );
}
export default CheckoutPage;
