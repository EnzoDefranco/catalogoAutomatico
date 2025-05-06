import { NextResponse } from 'next/server';
import { ProductService } from '../../../services/productService';


// Aquí sí recibimos params
export async function GET(request, { params }) {
  // 1) validamos y parseamos el id
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    // 2) invocamos el service de "findById"
    const product = await ProductService.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    }
    // 3) devolvemos un objeto consistente
    return NextResponse.json({ data: product });
  } catch (error) {
    console.error(error);
   return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
