//ProductService.findAll recibe ese filters, arma dinámicamente las cláusulas SQL y solo añade al WHERE los filtros que no sean undefined.
import { conn } from "@/app/libs/mysql";

function buildWhereClause(filters = {}) {
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

  if (filters.descripcion) {
    clauses.push("descripcion LIKE ?");
    params.push(`%${filters.descripcion}%`);
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
    params.push(...filters.kilosUnitarios);
  }

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

  if (filters.rubroDescripcion) {
    const arr = Array.isArray(filters.rubroDescripcion)
      ? filters.rubroDescripcion
      : [filters.rubroDescripcion];
    const ph = arr.map(() => "?").join(",");
    clauses.push(`rubroDescripcion IN (${ph})`);
    params.push(...arr);
  }

  return {
    where: clauses.length ? " WHERE " + clauses.join(" AND ") : "",
    params,
  };
}

export const ProductService = {
  async findAll(filters = {}) {
    console.log("filtros recibidos:", filters);
    const { where, params } = buildWhereClause(filters);
    const sql = "SELECT * FROM articulosl4" + where;
    return await conn.query(sql, params);
  },

  async getFacets(filters = {}) {
    const { where, params } = buildWhereClause(filters);

    const extra = cond => (where ? `${where} AND ${cond}` : ` WHERE ${cond}`);

    const brands = await conn.query(
      `SELECT proveedorNombre AS value, COUNT(*) AS count FROM articulosl4${where} GROUP BY proveedorNombre`,
      params,
    );

    const categories = await conn.query(
      `SELECT division AS value, COUNT(*) AS count FROM articulosl4${where} GROUP BY division`,
      params,
    );

    const kilosUnitarios = await conn.query(
      `SELECT kilosUnitarios AS value, COUNT(*) AS count FROM articulosl4${extra(
        "kilosUnitarios IS NOT NULL",
      )} GROUP BY kilosUnitarios`,
      params,
    );

    const linea = await conn.query(
      `SELECT linea AS value, COUNT(*) AS count FROM articulosl4${extra(
        "linea IS NOT NULL",
      )} GROUP BY linea`,
      params,
    );

    const fabrica = await conn.query(
      `SELECT fabrica AS value, COUNT(*) AS count FROM articulosl4${extra(
        "fabrica IS NOT NULL",
      )} GROUP BY fabrica`,
      params,
    );

    const rubroDescripcion = await conn.query(
      `SELECT rubroDescripcion AS value, COUNT(*) AS count FROM articulosl4${extra(
        "rubroDescripcion IS NOT NULL",
      )} GROUP BY rubroDescripcion`,
      params,
    );

    return { brands, categories, kilosUnitarios, linea, fabrica, rubroDescripcion };
  },


  async findById(id) {
    const rows = await conn.query(
      "SELECT * FROM articulosl4 WHERE idArticulo = ?",
      [id]
    );
    return rows[0] || null;
  },
};
