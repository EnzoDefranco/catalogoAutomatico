// app/components/PriceFilter.jsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const router = useRouter();
  const sp = useSearchParams();
  const [min, setMin] = useState(sp.get("minPrice") || "");
  const [max, setMax] = useState(sp.get("maxPrice") || "");

  function apply() {
    const params = new URLSearchParams(Object.fromEntries(sp.entries()));
    min ? params.set("minPrice", min) : params.delete("minPrice");
    max ? params.set("maxPrice", max) : params.delete("maxPrice");
    router.push(`/Catalogo?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="number"
        placeholder="Mínimo"
        value={min}
        onChange={e => setMin(e.target.value)}
        className="border px-2"
      />
      <input
        type="number"
        placeholder="Máximo"
        value={max}
        onChange={e => setMax(e.target.value)}
        className="border px-2"
      />
      <button onClick={apply} className="bg-blue-500 text-white px-3 rounded">
        Filtrar precio
      </button>
    </div>
  );
}
