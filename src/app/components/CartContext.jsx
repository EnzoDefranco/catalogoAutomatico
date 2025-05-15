"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product, precioFinal) {
    setCart(prev => [
      ...prev,
      { ...product, precioFinal }
    ]);
  }

  function removeFromCart(idArticulo) {
    setCart(prev => prev.filter(item => item.idArticulo !== idArticulo));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}