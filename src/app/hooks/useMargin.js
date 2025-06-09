

import { useState } from "react";

export const useMargin = (costoManual, precioLista4) => {
  // Calcular el margen inicial basado en el costo manual y el precio de lista
  const margenInicial = precioLista4
    ? 1 - costoManual / precioLista4
    : 0;

  // Estado para el margen
  const [margen, setMargen] = useState(margenInicial);

  // Calcular el precio final basado en el costo manual y el margen
  const precioFinal = (costoManual / (1 - margen)) * 1.21;

  return { margen, setMargen, precioFinal };
}