import { conn } from '@/app/libs/mysql';

export const ProductService = {
  async findAll(filters = {}) {
    let sql = 'SELECT * FROM articulosl4';
    const clauses = [], params = [];
    if (filters.stock !== undefined) {
      clauses.push('stock = ?');
      params.push(filters.stock);
    }
    if (filters.proveedorNombre) {
      clauses.push('proveedorNombre = ?');
      params.push(filters.proveedorNombre);
    }

    if (filters.minPrice !== undefined) {
      clauses.push('precioLista4 >= ?');
      params.push(filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      clauses.push('precioLista4 <= ?');
      params.push(filters.maxPrice);
    }





    // …más filtros…
    if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ');
    return await conn.query(sql, params);
  },

  async findById(id) {
    const rows = await conn.query(
      'SELECT * FROM articulosl4 WHERE idArticulo = ?',
      [id]
    );
    return rows[0] || null;
  }
};
