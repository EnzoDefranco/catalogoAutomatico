
import StockTag from "./StockTag";
import GramajeRibbon from "./GramajeRibbon";
import CategoryBadge from "./CategoryBadge";
import Badge from "./Badge";
import { parseISO, format } from "date-fns";
import { useState } from "react";
import Image from 'next/image'



export default function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;
  const fecha = parseISO(product.ultModificacion);
  const fechaFormateada = format(fecha, "dd/MM/yyyy");


  const costoManual = product.costoManual;
  const precioLista4 = product.precioLista4;

  const margenInicial = precioLista4
    ? 1 - costoManual / precioLista4
    : 0;


  // const [margen, setMargen] = useState(
  //   product.precioLista4 !== undefined ? product.precioLista4 : 0
  // );

  const [margen, setMargen] = useState(margenInicial);
  const precioFinal = (costoManual / (1 - margen)) * 1.21;

  return (
    <div className="relative flex flex-col justify-between w-full h-[550px] rounded-3xl bg-white p-5 text-center shadow-md transition hover:shadow-lg">
      {/* Etiqueta “Sin Stock” */}
      {/* {isOutOfStock && <StockTag />} */}

            <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
        {/* sólo mostramos el badge de “Sin Stock” cuando isOutOfStock */}
        {isOutOfStock && <StockTag />}
        {/* la categoría SIEMPRE va debajo del stock (o sola si hay stock) */}
        <CategoryBadge className="ml-0">
          {product.division}
        </CategoryBadge>
      </div>


      
        {/* Etiqueta de gramaje */}
        <GramajeRibbon gramaje={product.kilosUnitarios} />

      {/* Etiqueta de nuevo */}

      {/* Imagen */}
      <img
        src={`../images/${product.eanUnidad}.png`}
        alt={product.descripcion}
        className="w-[150px] h-auto mx-auto"
        loading="lazy"
        
      />

      {/* Nombre */}
      <h3 className="text-sm font-semibold text-gray-900  mb-1">
        {product.descripcion}
      </h3>

      {/* Proveedor */}
      <p className="text-sm font-medium text-gray-700 mb-1">
        {product.proveedorNombre}
      </p>

      {/* Proveedor */}
        {/* <p className="text-sm font-medium text-gray-700 mb-1">
        {product.fabrica}
      </p> */}

      {/* Datos técnicos */}
      <p className="text-xs text-gray-400 leading-5 mb-3">
        Cod. Barras: {product.eanUnidad}
        <br />
        UxB | {product.unidadesPorBulto}
        <br />
        UxD | {product.unidadesPorDisplay}
        <br />
        BxP | {product.bultosPorPallets}
        <br />
        Stock: {product.stock} unidades
        <br />
        Ult modificación: {fechaFormateada}
        <br />
        <br />
        Costo Manual : ${product.costoManual}
        <br />
        Precio L4 : ${product.precioLista4}
      </p>

            {/* Selector de margen */}
            <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Margen: {(margen * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={margen}
          onChange={(e) => setMargen(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Precio final calculado */}
      <p className="text-base font-bold mb-4">
        Precio final +IVA: ${precioFinal.toFixed(2)}
      </p>
      <div className="mt-4 flex justify-center">
</div>


    </div>
  );
}