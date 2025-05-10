
import StockTag from "./StockTag";
import GramajeRibbon from "./GramajeRibbon";
import CategoryBadge from "./CategoryBadge";
import useFormattedDate from "../hooks/useFormattedDate";
import { useMargin } from "../hooks/useMargin";




export default function ProductCard({ product }) {

  // const { product } = props;
  const { idArticulo,eanUnidad,descripcion,proveedorNombre,unidadesPorDisplay,unidadesPorBulto,precioLista4,stock,deposito,rubroDescripcion,linea,division,fabrica,marca,suspendido,desactivado,enListaPrecios,kilosUnitarios,ventaMinima,creado,ultModificacion,costoManual,bultosPorPallets} = product;
  const isOutOfStock = product.stock === 0; // IsOutOfStock es un booleano que indica si el producto está fuera de stock o no
  const fecha = useFormattedDate(product.ultModificacion);
  const {margen, setMargen, precioFinal} = useMargin(costoManual, precioLista4);




  return (
    <div className="relative flex flex-col justify-between w-full h-[550px] rounded-3xl bg-white p-5 text-center shadow-md transition hover:shadow-lg">


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
        className="w-[150px] h-auto mx-auto"
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
      <p className="text-base font-bold mb-4">Precio final +IVA: ${precioFinal.toFixed(2)}</p>
      <div className="mt-4 flex justify-center"></div>
    </div>
  );
}