import { NextResponse } from 'next/server';
import { ProductService } from '../../services/productService';

export async function GET(request) {
  const url = new URL(request.url);
  const filters = {
    stock: url.searchParams.has('stock') ? Number(url.searchParams.get('stock')) : undefined,
    proveedorNombre: url.searchParams.get('proveedorNombre') || undefined
  };

  try {
    const data = await ProductService.findAll(filters);
    return NextResponse.json({ data, meta: { total: data.length } });
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

