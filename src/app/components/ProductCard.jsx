
import StockTag from "./StockTag";
import Badge from "./Badge";

export default function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;

  const formatName = (str) =>
    str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="relative flex flex-col justify-between w-full h-[400px] rounded-3xl bg-white p-5 text-center shadow-md transition hover:shadow-lg">
      {/* Etiqueta “Sin Stock” */}
      {isOutOfStock && <StockTag />}

      {/* Imagen */}
      <img
        src="../images/7790710000218.png"
        alt={product.descripcion}
        className="w-[150px] h-auto mx-auto"
        loading="lazy"
        
      />


      {/* Nombre */}
      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
        {product.descripcion}
        {product.capacidad && <Badge>{product.capacidad}</Badge>}
      </h3>

      {/* Proveedor */}
      <p className="text-sm font-medium text-gray-700 mb-1">
        {formatName(product.proveedorNombre)}
      </p>

      {/* Datos técnicos */}
      <p className="text-xs text-gray-400 leading-5 mb-3">
        Cod. Barras: {product.eanUnidad}
        <br />
        UxB | {product.unidadesPorBulto}
        <br />
        Stock: {product.stock} unidades
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