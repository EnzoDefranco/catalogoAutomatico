"use client";
import CheckboxFilter from "./CheckboxFilter";
import useFacets from "../hooks/useFacets";

export default function FilterSidebar() {
  const { data, isLoading, isError } = useFacets();
  if (isLoading) return <p>Cargando filtros…</p>;
  if (isError) return <p>Error cargando filtros</p>;

  return (
    <aside className="space-y-6 top-20">
      <h2 className="text-lg font-semibold">Filtros</h2>
      <CheckboxFilter title="Marca" paramKey="proveedorNombre" options={data.brands || []} />
      <CheckboxFilter title="Categoría" paramKey="division" options={data.categories || []} />
      <CheckboxFilter title="Kilos Unitarios" paramKey="kilosUnitarios" options={data.kilosUnitarios || []} />

    </aside>
  );
}