// app/Catalogo/page.jsx
"use client";


import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import { useSearchParams } from "next/navigation";



export default function CatalogoPage() {
  const sp = useSearchParams();
  const filters = {
    minPrice:        sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice:        sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    stock:           sp.get("stock") ? Number(sp.get("stock")) : undefined,
    proveedorNombre: sp.getAll("proveedorNombre"),
    division:        sp.getAll("division"),
  kilosUnitarios: sp.getAll("kilosUnitarios").length > 0 ? sp.getAll("kilosUnitarios") : undefined, // Verifica si está vacío


  }
  return (
    <div className="container mx-auto mt-5 pb-10">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-2">
        <aside className="space-y-6 relative top-20">
          <FilterSidebar />
          
        </aside>

        <section>
          <ProductList filters={filters} />
        </section>
      </div>

    </div>
  );
}
