"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

const fetcher = url => fetch(url).then(r=>r.json());

export default function useFacets() {
  const sp = useSearchParams();

  const filters = {
    minPrice:        sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice:        sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    stock:           sp.get("stock") ? Number(sp.get("stock")) : undefined,
    proveedorNombre: sp.getAll("proveedorNombre"),
    division:        sp.getAll("division"),
    descripcion:     sp.get("descripcion") || undefined,
    kilosUnitarios:  sp.getAll("kilosUnitarios").length > 0 ? sp.getAll("kilosUnitarios") : undefined,
    linea:           sp.getAll("linea").length > 0 ? sp.getAll("linea") : undefined,
    fabrica:         sp.getAll("fabrica").length > 0 ? sp.getAll("fabrica") : undefined,
    rubroDescripcion:sp.getAll("rubroDescripcion").length > 0 ? sp.getAll("rubroDescripcion") : undefined,
  };

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  const qs = params.toString();
  const { data, error } = useSWR(`/api/products/facets?${qs}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
}
