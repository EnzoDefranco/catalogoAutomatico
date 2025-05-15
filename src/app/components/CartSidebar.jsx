"use client";
import { useCart } from "./CartContext";
import { useState } from "react";

export default function CartSidebar() {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante para abrir el carrito */}
      <button
        className="fixed top-6 right-6 z-40 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        🛒 Carrito ({cart.length})
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Carrito</h2>
          <button
            className="text-gray-500 hover:text-gray-800 text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {cart.length === 0 ? (
            <div>Carrito vacío</div>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.idArticulo} className="flex justify-between items-center mb-2">
                    <span>{item.descripcion}</span>
                    <span>${item.precioFinal.toFixed(2)}</span>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => removeFromCart(item.idArticulo)}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
              <div className="font-bold mt-2">
                Total: ${cart.reduce((sum, item) => sum + item.precioFinal, 0).toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Fondo oscuro al abrir el carrito */}
      {open && (
        <div
          className="fixed inset-0  bg-opacity-10 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}