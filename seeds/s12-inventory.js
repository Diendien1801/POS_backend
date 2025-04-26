/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Clear existing entries in Inventory
    await knex('Inventory').del();
  
    // Insert multiple laptops for each inventory
    await knex('Inventory').insert([
      { idKho: 1, idLaptop: 1, soLuong: 23, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 2, soLuong: 45, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 3, soLuong: 12, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 4, soLuong: 34, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 5, soLuong: 7, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 6, soLuong: 19, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 7, soLuong: 33, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 8, soLuong: 28, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 9, soLuong: 5, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 10, soLuong: 42, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 11, soLuong: 15, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 12, soLuong: 31, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 13, soLuong: 8, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 14, soLuong: 26, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 15, soLuong: 39, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 16, soLuong: 14, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 17, soLuong: 37, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 18, soLuong: 11, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 19, soLuong: 22, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 20, soLuong: 47, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 21, soLuong: 18, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 22, soLuong: 29, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 23, soLuong: 41, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 24, soLuong: 9, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 25, soLuong: 36, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 26, soLuong: 24, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 27, soLuong: 43, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 28, soLuong: 17, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 29, soLuong: 30, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 30, soLuong: 38, viTriKho: 'A1' }
    ]);
  };