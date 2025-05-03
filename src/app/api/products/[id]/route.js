import { NextResponse } from "next/server";
import {conn} from  "@/app/libs/mysql";

// export async function GET(request, { params }) {
//     const results = await conn.query("SELECT * FROM articulosl4 WHERE idArticulo = ?", [params.id]);
//     console.log(results);
//     return NextResponse.json({ message: results[0] });
// }

export async function GET(request, { params }) {
    try {
        const results = await conn.query("SELECT * FROM articulosl4 WHERE idArticulo = ?", [params.id]);
        if (results.length === 0) {
            return NextResponse.json(
                { error: "Articulo no encontrado" },
                { status: 404 }
            );
        }
        return NextResponse.json(results[0]);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error al obtener el producto",
                message: error.message,
            },
            { status: 500 }
        );      
    }
}