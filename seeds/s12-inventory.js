/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Clear existing entries in Inventory
    await knex('Inventory').del();
  
    // Insert multiple laptops for each inventory
    await knex('Inventory').insert([
      { idKho: 1, idLaptop: 1, soLuong: 8, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 2, soLuong: 6, viTriKho: 'A1' },
      { idKho: 1, idLaptop: 3, soLuong: 10, viTriKho: 'A2' },
      { idKho: 2, idLaptop: 2, soLuong: 5, viTriKho: 'B1' },
      { idKho: 2, idLaptop: 3, soLuong: 12, viTriKho: 'B1' },
      { idKho: 2, idLaptop: 4, soLuong: 7, viTriKho: 'B2' },
      { idKho: 3, idLaptop: 1, soLuong: 15, viTriKho: 'C1' },
      { idKho: 3, idLaptop: 4, soLuong: 9, viTriKho: 'C2' }
    ]);
  };