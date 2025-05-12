import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function GET() {
  // Conteos por marca (proveedorNombre)
  const brands = await conn.query(
    `SELECT proveedorNombre AS value, COUNT(*) AS count
     FROM articulosl4
     GROUP BY proveedorNombre`
  );
  // Conteos por categoría (division)
  const categories = await conn.query(
    `SELECT division AS value, COUNT(*) AS count
     FROM articulosl4
     GROUP BY division`
  );
  // Valores únicos de kilosUnitarios
  const kilosUnitarios = await conn.query(
    `SELECT kilosUnitarios AS value, COUNT(*) AS count
     FROM articulosl4
     WHERE kilosUnitarios IS NOT NULL
     GROUP BY kilosUnitarios`
  );
  return NextResponse.json({ brands, categories, kilosUnitarios });
}
