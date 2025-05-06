// app/Catalogo/page.jsx
"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ArticuloCard from "../components/ProductCard";
import PriceFilter from "../components/PriceFilters";
import ProductList from "../components/ProductList";

import { max } from "date-fns";


const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CatalogoPage() {
  return (
    <div className="container mx-auto mt-5 pb-10">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>

      {/* Filtro de rango de precio */}
      <PriceFilter />

      {/* Lista de productos — aquí viva toda la lógica de SWR */}
      <ProductList />
    </div>
  );
}
