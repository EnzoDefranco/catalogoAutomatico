"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckboxFilter({ title, paramKey, options }) {
  const sp = useSearchParams();
  const router = useRouter();
  const selected = sp.getAll(paramKey);

  function toggle(val) {
    const params = new URLSearchParams(Object.fromEntries(sp.entries()));
    const isOn = selected.includes(val);
    if (isOn) {
      // eliminar todas las ocurrencias
      params.delete(paramKey);
      selected.filter(v=>v!==val).forEach(v=>params.append(paramKey, v));
    } else {
      params.append(paramKey, val);
    }
    router.push(`/Catalogo?${params.toString()}`);
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">{title}</h3>
      {options.map(opt => (
        <label key={opt.value} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={()=>toggle(opt.value)}
            className="form-checkbox"
          />
          <span className="text-sm">{opt.value} <span className="text-gray-500">({opt.count})</span></span>
        </label>
      ))}
    </div>
  );
}
