import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const safeQty = Math.max(1, Number(quantity) || 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex === -1) {
        return [...prev, { ...product, quantity: safeQty }];
      }

      return prev.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: (item.quantity || 1) + safeQty }
          : item,
      );
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    const safeQty = Math.max(1, Number(quantity) || 1);
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: safeQty } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + (item.quantity || 1), 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
