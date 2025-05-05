
import StockTag from "./StockTag";
import Badge from "./Badge";
import { parseISO, format } from "date-fns";


export default function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;
  const fecha = parseISO(product.ultModificacion);
  const fechaFormateada = format(fecha, "dd/MM/yyyy");


  return (
    <div className="relative flex flex-col justify-between w-full h-[450px] rounded-3xl bg-white p-5 text-center shadow-md transition hover:shadow-lg">
      {/* Etiqueta “Sin Stock” */}
      {isOutOfStock && <StockTag />}

      {/* Imagen */}
      <img
        src="../images/prueba.jpg"
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
        Stock: {product.stock} unidades
        <br />
        Ult modificación: {fechaFormateada}
        <br />
      </p>

      {/* Botón */}
      <div>
        <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600">
          INICIÁ SESIÓN
          <br />
          para ver precio
        </button>
      </div>
    </div>
  );
}