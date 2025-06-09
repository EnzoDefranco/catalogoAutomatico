import { NextResponse } from "next/server";
import { ProductService } from "../../../services/productService";

export async function GET(request) {
  const url = new URL(request.url);

  const kilosArr   = url.searchParams.getAll('kilosUnitarios');
  const lineaArr   = url.searchParams.getAll('linea');
  const fabricaArr = url.searchParams.getAll('fabrica');
  const rubrosArr  = url.searchParams.getAll('rubroDescripcion');
  const descripcion = url.searchParams.get('descripcion');

  const filters = {
    stock:           url.searchParams.has('stock')     ? Number(url.searchParams.get('stock')) : undefined,
    proveedorNombre: url.searchParams.get('proveedorNombre') || undefined,
    minPrice:        url.searchParams.has('minPrice')  ? Number(url.searchParams.get('minPrice')) : undefined,
    maxPrice:        url.searchParams.has('maxPrice')  ? Number(url.searchParams.get('maxPrice')) : undefined,
    division:        url.searchParams.get('division')   || undefined,
    descripcion:     descripcion || undefined,
    kilosUnitarios:  kilosArr.length   > 0 ? kilosArr   : undefined,
    linea:           lineaArr.length   > 0 ? lineaArr   : undefined,
    fabrica:         fabricaArr.length > 0 ? fabricaArr : undefined,
    rubroDescripcion:rubrosArr.length  > 0 ? rubrosArr  : undefined,
  };

  const data = await ProductService.getFacets(filters);
  return NextResponse.json(data);
}
