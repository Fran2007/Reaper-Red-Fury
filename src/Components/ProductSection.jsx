import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

function ProductsSection() {
  const navigate = useNavigate(); // 🔥 ESTA LÍNEA FALTABA

  return (
    <section
      id="productos"
      className="relative min-h-screen w-full overflow-hidden text-white bg-gradient-to-br from-black via-red-950 to-orange-950 py-16 sm:py-20"
    >
      {/* Glow rojo igual que Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.18),transparent_60%)]" />

      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 px-4">
          Nuestros Productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto px-4 sm:px-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/producto/${product.id}`)}
              className="cursor-pointer bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-xl"
              />

              <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">
                {product.name}
              </h3>

              <p className="text-orange-400 font-bold mt-2 text-lg">
                $ {product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
