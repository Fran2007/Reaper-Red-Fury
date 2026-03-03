import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../Context/CartContext";
import { getProductById } from "../data/products";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(id);
  if (!product) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 px-4 flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Producto no encontrado
        </h1>
        <Link
          to="/#productos"
          className="text-orange-400 hover:underline text-sm sm:text-base"
        >
          Ver todos los productos{" "}
        </Link>
      </div>
    );
  }
  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/carrito");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white bg-gradient-to-br from-black via-red-950 to-orange-950 flex items-center pt-28 pb-16 px-4 sm:px-6">
      {/* 🔥 Glow de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.18),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <Link
          to="/#productos"
          className="inline-block text-gray-400 hover:text-white mb-8 text-sm transition"
        >
          ← Volver a productos
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* 🖼 Imagen */}
          <div className="relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />

            {/* Glow sutil en imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* 📦 Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-gray-300 mb-6 text-lg">
                {product.description}
              </p>
            )}

            <p className="text-3xl font-bold mb-8 text-orange-400">
              $ {product.price.toFixed(2)}
            </p>

            {/* 🔢 Cantidad */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center rounded-xl border border-white/20 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 transition text-xl font-bold"
                >
                  −
                </button>

                <span className="w-14 text-center font-semibold text-lg">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 transition text-xl font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-red-600 hover:bg-red-500 transition px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-red-900/40"
              >
                Añadir al carrito
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              Pago seguro con Stripe. Envío a toda España.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default ProductPage;
