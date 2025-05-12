import { NextResponse } from "next/server";
import { ProductService } from "@/app/services/productService";

export async function GET(request) {
  const url = new URL(request.url);

  // Multi‑select → .getAll()
  const proveedores = url.searchParams.getAll("proveedorNombre");
  const divisiones  = url.searchParams.getAll("division");

  const filters = {
    minPrice:        url.searchParams.has("minPrice") ? Number(url.searchParams.get("minPrice")) : undefined,
    maxPrice:        url.searchParams.has("maxPrice") ? Number(url.searchParams.get("maxPrice")) : undefined,
    stock:           url.searchParams.has("stock")    ? Number(url.searchParams.get("stock"))    : undefined,
  };
  if (proveedores.length) filters.proveedorNombre = proveedores;
  if (divisiones.length)  filters.division        = divisiones;

  try {
    const data = await ProductService.findAll(filters);
    return NextResponse.json({ data, meta: { total: data.length } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
