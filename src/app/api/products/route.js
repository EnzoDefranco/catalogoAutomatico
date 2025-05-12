import { NextResponse } from 'next/server';
import { ProductService } from '../../services/productService';


export async function GET(request) {
  const url = new URL(request.url);
  const filters = {
    stock: url.searchParams.has('stock') ? Number(url.searchParams.get('stock')) : undefined,
    proveedorNombre: url.searchParams.get('proveedorNombre') || undefined,
    minPrice: url.searchParams.has('minPrice') ? Number(url.searchParams.get('minPrice')) : undefined,
    maxPrice: url.searchParams.has('maxPrice') ? Number(url.searchParams.get('maxPrice')) : undefined,
    division: url.searchParams.get('division') || undefined,
    kilosUnitarios: url.searchParams.getAll("kilosUnitarios"), // Nuevo filtro

    };

  try {
    const data = await ProductService.findAll(filters);
    return NextResponse.json({ data, meta: { total: data.length } });
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

