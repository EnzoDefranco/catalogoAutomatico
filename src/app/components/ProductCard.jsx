
import StockTag from "./StockTag";
import GramajeRibbon from "./GramajeRibbon";
import CategoryBadge from "./CategoryBadge";
import useFormattedDate from "../hooks/useFormattedDate";
import { useMargin } from "../hooks/useMargin";
import { useCart } from "./CartContext";




export default function ProductCard({ product }) {

  // const { product } = props;
  const { idArticulo,eanUnidad,descripcion,proveedorNombre,unidadesPorDisplay,unidadesPorBulto,precioLista4,stock,deposito,rubroDescripcion,linea,division,fabrica,marca,suspendido,desactivado,enListaPrecios,kilosUnitarios,ventaMinima,creado,ultModificacion,costoManual,bultosPorPallets} = product;
  const isOutOfStock = product.stock === 0; // IsOutOfStock es un booleano que indica si el producto está fuera de stock o no
  const fecha = useFormattedDate(product.ultModificacion);
  const {margen, setMargen, precioFinal} = useMargin(costoManual, precioLista4);
  const { addToCart } = useCart();




  return (
    <div className="relative h-full w-full flex flex-col justify-between rounded-3xl bg-white p-5 text-center shadow-md transition hover:shadow-lg">


      <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
        {/* sólo mostramos el badge de “Sin Stock” cuando isOutOfStock */}
        {isOutOfStock && <StockTag />}
        <CategoryBadge className="ml-0">
          {division}
        </CategoryBadge>
      </div>
        <GramajeRibbon gramaje={kilosUnitarios} />
      <img
        src={`../images/${eanUnidad}.png`}
        alt={product.descripcion}
        className="w-[200px] h-[200px] mx-auto"
        loading="lazy"
      />
      <h3 className="text-sm font-semibold text-gray-900  mb-1">{descripcion}</h3>
      <p className="text-sm font-medium text-gray-700 mb-1">{proveedorNombre}</p>

      <p className="text-xs text-gray-400 leading-5 mb-3">
        Cod. Barras: {eanUnidad}<br />
        UxB | {unidadesPorBulto}<br />
        UxD | {unidadesPorDisplay}<br />
        BxP | {bultosPorPallets} <br />
        Stock: {stock} unidades<br />
        Ult modificación: {fecha}<br />
        {/* Costo Manual : ${costoManual}<br />Precio L4 : ${precioLista4} */}
      </p>

           
      <div className="mt-auto mb-4">
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
      <p className="text-base font-bold mb-4">Precio final +IVA: ${precioFinal.toFixed(2)}</p>
      <button
        className={`w-full rounded-lg bg-blue-500 py-2 text-white font-semibold transition hover:bg-blue-600 ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (!isOutOfStock) {
            addToCart(product, precioFinal);
          }
        }}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "Sin Stock" : "Agregar al carrito"}
      </button>
      <div className="mt-4 flex justify-center"></div>

    </div>
  );
}