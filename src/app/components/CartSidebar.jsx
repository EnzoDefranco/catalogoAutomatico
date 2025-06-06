"use client";
import { useCart } from "./CartContext";
import { useState } from "react";

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante para abrir el carrito */}
      <button
        className="fixed top-6 right-6 z-40 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        🛒 Carrito ({cart.reduce((s, i) => s + i.cantidad, 0)})
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
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li
                    key={`${item.idArticulo}-${index}`}
                    className="flex items-center justify-between"
                  >
                    <img
                      src={`/images/${item.eanUnidad}.png`}
                      alt={item.descripcion}
                      className="w-12 h-12 object-contain mr-2"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.descripcion}</p>
                      <p className="text-xs text-gray-500">
                        ${item.precioFinal.toFixed(2)} c/u
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="px-2 text-xl"
                        onClick={() => updateQuantity(item.idArticulo, item.cantidad - 1)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.cantidad}</span>
                      <button
                        className="px-2 text-xl"
                        onClick={() => updateQuantity(item.idArticulo, item.cantidad + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => removeFromCart(item.idArticulo)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="font-bold mt-4 text-right">
                Total: $
                {cart
                  .reduce(
                    (sum, item) => sum + item.precioFinal * item.cantidad,
                    0
                  )
                  .toFixed(2)}                
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