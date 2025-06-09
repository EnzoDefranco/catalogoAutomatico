"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product, precioFinal) {
    setCart(prev => {
      const existing = prev.find(item => item.idArticulo === product.idArticulo);
      if (existing) {
        return prev.map(item =>
          item.idArticulo === product.idArticulo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...product, precioFinal, cantidad: 1 }];
    });
  }

  function removeFromCart(idArticulo) {
    setCart(prev => prev.filter(item => item.idArticulo !== idArticulo));
  }

    function updateQuantity(idArticulo, cantidad) {
    if (cantidad <= 0) {
      removeFromCart(idArticulo);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.idArticulo === idArticulo ? { ...item, cantidad } : item
      )
    );
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}