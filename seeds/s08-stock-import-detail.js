//// filepath: d:\POS_backend\seeds\s08-stock-import-detail.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear old data
  await knex("StockImportDetail").del();

  // Insert sample StockImportDetail data
  await knex("StockImportDetail").insert([
    {
      idStockImportDetail: 1,
      idPhieuNhap: 1,
      idLaptop: 1,
      soLuong: 3,
      giaNhap: 15000000
    },
    {
      idStockImportDetail: 2,
      idPhieuNhap: 2,
      idLaptop: 2,
      soLuong: 2,
      giaNhap: 32500000
    },
    {
      idStockImportDetail: 3,
      idPhieuNhap: 3,
      idLaptop: 3,
      soLuong: 1,
      giaNhap: 30000000
    },
    {
      idStockImportDetail: 4,
      idPhieuNhap: 1,
      idLaptop: 3,
      soLuong: 1,
      giaNhap: 30000000
    }
  ]);
  
  // Update Inventory
  const details = await knex("StockImportDetail").select("*");
  for (const detail of details) {
    const inventory = await knex("Inventory")
      .where({ idLaptop: detail.idLaptop })
      .first();
    
    if (inventory) {
      // Update existing record
      await knex.raw(
        `UPDATE "Inventory" SET "soLuong" = "soLuong" + ? WHERE "idKho" = ? AND "idLaptop" = ?`,
        [detail.soLuong, inventory.idKho, detail.idLaptop]
      );
    } else {
      // Create new record with default idKho
      await knex("Inventory").insert({
        idKho: 1,                // Default warehouse ID
        idLaptop: detail.idLaptop,
        soLuong: detail.soLuong,
        viTriKho: 'Kho chính'
      });
    }
  }
};