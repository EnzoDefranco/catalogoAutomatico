import { NextResponse } from "next/server";
import {conn} from  "@/app/libs/mysql";


// export async function GET() {
//     // return NextResponse.json({ message: "Soy el ID de la api de articulos" });
//     const results = await conn.query("SELECT NOW()");
//     console.log(results);
//     return NextResponse.json({ message: results[0]['NOW()'] });
// }

export async function GET() {
    try {
        const results = await conn.query("SELECT * FROM articulosl4");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error al obtener los articulos",
                message: error.message,
            },
            { status: 500 }
        );      
    }
}
