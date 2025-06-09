"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const [value, setValue] = useState(sp.get("descripcion") || "");

  useEffect(() => {
    setValue(sp.get("descripcion") || "");
  }, [sp]);

  function handleChange(e) {
    const val = e.target.value;
    setValue(val);
    const params = new URLSearchParams(Array.from(sp.entries()));
    if (val) {
      params.set("descripcion", val);
    } else {
      params.delete("descripcion");
    }
    router.push(`/Catalogo?${params.toString()}`);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Buscar productos..."
      className="w-full p-2 border rounded-md"
    />
  );
}