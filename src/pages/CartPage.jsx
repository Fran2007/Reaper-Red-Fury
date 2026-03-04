import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../Context/CartContext"; // adjust path if needed
import PageBackground from "../Components/PageBackground";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <PageBackground className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Añade algo de Reaper Red Fury para calentar el pedido.
          </p>
          <Link
            to="/#productos"
            className="inline-block bg-orange-600 hover:bg-orange-500 px-6 sm:px-8 py-3 rounded-xl font-semibold transition text-sm sm:text-base"
          >
            Ver productos
          </Link>
        </motion.div>
      </PageBackground>
    );
  }

  return (
    <PageBackground className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">Carrito</h1>
        <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base">
          {cartCount} {cartCount === 1 ? "producto" : "productos"}
        </p>

        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <AnimatePresence mode="popLayout">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-xl bg-black/40 border border-white/10"
              >
                <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-orange-400 font-bold text-sm sm:text-base">
                      $ {(Number(item.price) || 0).toFixed(2)}
                    </p>
                    <p className="text-orange-400 font-bold text-sm sm:hidden">
                      ${" "}
                      {(
                        (Number(item.price) || 0) * (item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(index, (item.quantity || 1) - 1)
                      }
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg font-bold"
                      aria-label="Menos"
                    >
                      −
                    </button>
                    <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">
                      {item.quantity || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(index, (item.quantity || 1) + 1)
                      }
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg font-bold"
                      aria-label="Más"
                    >
                      +
                    </button>
                  </div>
                  <p className="hidden sm:block w-20 md:w-24 text-right font-bold text-orange-400 text-sm sm:text-base">
                    ${" "}
                    {((Number(item.price) || 0) * (item.quantity || 1)).toFixed(
                      2,
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    className="text-red-400 hover:text-red-300 text-xs sm:text-sm shrink-0"
                    aria-label="Eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="rounded-xl bg-black/40 border border-white/10 p-4 sm:p-6 mb-8">
          <div className="flex justify-between text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            <span>Total</span>
            <span className="text-orange-400">${cartTotal.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
            IVA incluido. Envío calculado en el siguiente paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/#productos"
              className="flex-1 text-center py-3 rounded-xl border border-white/30 hover:bg-white/10 transition text-sm sm:text-base"
            >
              Seguir comprando
            </Link>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 font-semibold transition text-sm sm:text-base"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}

export default CartPage;
