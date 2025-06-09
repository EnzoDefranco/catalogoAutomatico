"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function ActiveFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const entries = Array.from(sp.entries());

  if (entries.length === 0) return null;

  function removeFilter(key, value) {
    const params = new URLSearchParams(Array.from(sp.entries()));
    const values = params.getAll(key).filter(v => v !== value);
    params.delete(key);
    values.forEach(v => params.append(key, v));
    router.push(`/Catalogo?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {entries.map(([key, value], idx) => (
        <span
          key={`${key}-${idx}`}
          className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center gap-1"
        >
          <span>{key}: {value}</span>
          <button
            onClick={() => removeFilter(key, value)}
            className="text-blue-500 hover:text-blue-700"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}