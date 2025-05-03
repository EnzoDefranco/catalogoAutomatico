// function ProductCard({ product }) {
//   return (
//     <div className="bg-white rounded-lg border-gray-800 mb-3 p-4">
//       <h1 className="text-md font-bold text-black">{product.descripcion}</h1>


//     </div>
//   );
// }

// export default ProductCard;


function ProductCard({ product }) {
  return (
  <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
    <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Product Image" />
    <div className="p-4">
      <h2 className="text-md font-medium dark:text-white text-gray-900">{product.descripcion}</h2>
      {/* <p className=" text-sm text-base dark:text-gray-300 text-gray-700">EAN {product.eanUnidad}</p> */}
      <p className=" text-sm text-base dark:text-gray-300 text-gray-700">{product.proveedorNombre}</p>
      <p className=" text-sm text-base dark:text-gray-300 text-gray-700">UxB: {product.unidadesPorBulto}</p>
      <div className="flex items-center">
        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${product.precioLista4}</p>
        <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
        <p className="ml-auto text-base font-medium text-green-500">20% off</p>
      </div>
    </div>
  </div>
  );
}

export default ProductCard;

