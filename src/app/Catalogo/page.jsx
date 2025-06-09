// app/Catalogo/page.jsx
"use client";


import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import { useSearchParams } from "next/navigation";
import CartSidebar from "../components/CartSidebar";
import SearchBar from "../components/SearchBar";
import ActiveFilters from "../components/ActiveFilters";




export default function CatalogoPage() {
  const sp = useSearchParams();
  const filters = {
    minPrice:        sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice:        sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    stock:           sp.get("stock") ? Number(sp.get("stock")) : undefined,
    proveedorNombre: sp.getAll("proveedorNombre"),
    division:        sp.getAll("division"),
    descripcion:     sp.get("descripcion") || undefined,
    kilosUnitarios: sp.getAll("kilosUnitarios").length > 0 ? sp.getAll("kilosUnitarios") : undefined, // Verifica si está vacío}
    linea:           sp.getAll("linea").length > 0 ? sp.getAll("linea") : undefined, // Verifica si está vacío
    fabrica:         sp.getAll("fabrica").length > 0 ? sp.getAll("fabrica") : undefined,// Verifica si está vacío
    rubroDescripcion: sp.getAll("rubroDescripcion").length > 0 ? sp.getAll("rubroDescripcion") : undefined, // Verifica si está vacío
  }
  return (
    <div className="container mx-auto mt-5 pb-10">
      <CartSidebar />
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>
      <div className="mb-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-2">
        <aside className="space-y-6 relative top-20">
          <FilterSidebar />
          
        </aside>

        <section>

          <ActiveFilters />
          <ProductList filters={filters} />
        </section>
      </div>

    </div>
  );
}
