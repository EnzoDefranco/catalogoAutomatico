"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ArticuloCard from "./ProductCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductsList() {
  const sp = useSearchParams();
  const filters = {
    stock: sp.get("stock") ?? undefined,
    proveedorNombre: sp.get("proveedorNombre") ?? undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
  };

  const entries = Object.entries(filters).filter(([, v]) => v !== undefined && v !== "");
  const qs = new URLSearchParams(entries).toString();
  const { data, error } = useSWR(`/api/products?${qs}`, fetcher);

  if (error) return <p className="text-red-500">Error al cargar productos</p>;
  if (!data) return <p>Cargando productos…</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.data.map((p) => (
        <ArticuloCard key={p.idArticulo} product={p} />
      ))}
    </div>
  );
}
