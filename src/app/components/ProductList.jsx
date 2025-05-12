

// import useSWR from "swr";
// import ArticuloCard from "./ProductCard";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function ProductsList({ filters }) {
//   const entries = Object.entries(filters).filter(([, v]) => v !== undefined && v !== "");
//   const qs = new URLSearchParams(entries).toString();
//   const { data, error } = useSWR(`/api/products?${qs}`, fetcher);

//   if (error) return <p className="text-red-500">Error al cargar productos</p>;
//   if (!data) return <p>Cargando productos…</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {data.data.map((p) => (
//         <ArticuloCard key={p.idArticulo} product={p} />
//       ))}
//     </div>
//   );

// }

// ProductsList.jsx
"use client";
import useSWR from "swr";
import ArticuloCard from "./ProductCard";

const fetcher = url => fetch(url).then(res => res.json());

export default function ProductsList({ filters }) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });
  const qs = params.toString();
  const { data, error } = useSWR(`/api/products?${qs}`, fetcher);

  if (error) return <p className="text-red-500">Error al cargar productos</p>;
  if (!data) return <p>Cargando productos…</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.data.map(p => (
        <ArticuloCard key={p.idArticulo} product={p} />
      ))}
    </div>
  );
}
