// app/Catalogo/page.jsx
"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ArticuloCard from "../components/ProductCard";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CatalogoPage() {
  // 1) Obtengo los params del URL en el cliente
  const sp = useSearchParams();

  // 2) Construyo un objeto de filtros solo con los keys que me interesan
  const filters = {
    stock: sp.get("stock") ?? undefined,
    descripcion: sp.get("descripcion") ?? undefined,
    eanUnidad: sp.get("eanUnidad") ?? undefined,
    proveedorNombre: sp.get("proveedorNombre") ?? undefined,
    unidadesPorBulto: sp.get("unidadesPorBulto")
      ? Number(sp.get("unidadesPorBulto"))
      : undefined,
  };

  // 3) Quito los undefined y armo el QS
  const entries = Object.entries(filters).filter(([, v]) => v !== undefined);
  const qs = new URLSearchParams(entries).toString();

  // 4) Llamo a la API con SWR
  const { data, error } = useSWR(`/api/products?${qs}`, fetcher);

  if (error) return <p className="text-red-500">Error al cargar</p>;
  if (!data) return <p>Cargando…</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.data.map((p) => (
        <ArticuloCard key={p.idArticulo} product={p} />
      ))}
    </div>
  );
}
