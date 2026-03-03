import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import CartPage from "./pages/CartPage";
import ProductPage from "./Components/ProductPage";
import ProductsSection from "./Components/ProductSection";
import HeroSection from "./Components/HeroSection";
import Navbar from "./Components/Navbar";
import RecipesSection from "./Components/RecipiesSection";

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <RecipesSection />
              <ProductsSection />
            </>
          }
        />

        <Route path="/producto/:id" element={<ProductPage />} />
        <Route path="/carrito" element={<CartPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
