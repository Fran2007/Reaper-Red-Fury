import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { cartCount } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSectionWhenReady = useCallback((sectionId, attempts = 0) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (attempts < 20) {
      requestAnimationFrame(() =>
        scrollToSectionWhenReady(sectionId, attempts + 1),
      );
    }
  }, []);

  const goToSection = (sectionId) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => scrollToSectionWhenReady(sectionId));
      return;
    }

    scrollToSectionWhenReady(sectionId);
  };

  const links = (
    <>
      <button
        type="button"
        onClick={() => goToSection("hero")}
        className="hover:text-orange-400 transition"
      >
        Inicio
      </button>
      <button
        type="button"
        onClick={() => goToSection("recetas")}
        className="hover:text-orange-400 transition"
      >
        Recetas
      </button>
      <button
        type="button"
        onClick={() => goToSection("productos")}
        className="hover:text-orange-400 transition"
      >
        Productos
      </button>
      <Link
        to="/carrito"
        onClick={() => setOpen(false)}
        className="hover:text-orange-400 transition flex items-center gap-2"
      >
        Carrito
        {cartCount > 0 && (
          <span className="min-w-[1.35rem] h-5 px-1 flex items-center justify-center text-xs font-bold bg-orange-500 text-black rounded-full">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 shrink-0 hover:opacity-90 transition"
        >
          <img
            src="/images/logo.png"
            alt=""
            className="h-8 sm:h-9 md:h-10 w-auto object-contain"
          />
          <span className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-red-200">
            Reaper Red Fury
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-200">
          {links}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5 text-white"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col gap-1 px-4 py-4 text-gray-200 bg-black/30 [&>*]:block [&>*]:py-3 [&>*]:text-base [&>*]:border-b [&>*]:border-white/10 [&>*:last-child]:border-0">
              {links}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
