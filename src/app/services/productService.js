import { conn } from "@/app/libs/mysql";

export const ProductService = {
  async findAll(filters = {}) {
    console.log("filtros recibidos:", filters);
    let sql = "SELECT * FROM articulosl4";
    const clauses = [], params = [];

    // rango de precio
    if (filters.minPrice !== undefined) {
      clauses.push("precioLista4 >= ?");
      params.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      clauses.push("precioLista4 <= ?");
      params.push(filters.maxPrice);
    }

    // stock
    if (filters.stock !== undefined) {
      clauses.push("stock = ?");
      params.push(filters.stock);
    }

    // proveedorNombre puede ser string o array
    if (filters.proveedorNombre) {
      const arr = Array.isArray(filters.proveedorNombre)
        ? filters.proveedorNombre
        : [filters.proveedorNombre];
      const ph = arr.map(() => "?").join(",");
      clauses.push(`proveedorNombre IN (${ph})`);
      params.push(...arr);
    }

    if (filters.kilosUnitarios && filters.kilosUnitarios.length > 0) {
    const placeholders = filters.kilosUnitarios.map(() => "?").join(",");
    clauses.push(`kilosUnitarios IN (${placeholders})`);
    params.push(...filters.kilosUnitarios);}
    
    //array para linea
    if (filters.linea) {
      const arr = Array.isArray(filters.linea)
        ? filters.linea
        : [filters.linea];
      const ph = arr.map(() => "?").join(",");
      clauses.push(`linea IN (${ph})`);
      params.push(...arr);
    }

    //array para fabrica
    if (filters.fabrica) {
      const arr = Array.isArray(filters.fabrica)
        ? filters.fabrica
        : [filters.fabrica];
      const ph = arr.map(() => "?").join(",");
      clauses.push(`fabrica IN (${ph})`);
      params.push(...arr);
    }




      if (clauses.length) sql += " WHERE " + clauses.join(" AND ");
      return await conn.query(sql, params);
    },

  async findById(id) {
    const rows = await conn.query(
      "SELECT * FROM articulosl4 WHERE idArticulo = ?",
      [id]
    );
    return rows[0] || null;
  },
};
