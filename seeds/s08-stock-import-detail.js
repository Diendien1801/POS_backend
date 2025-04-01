/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa toàn bộ dữ liệu cũ trong bảng StockImportDetail
  await knex("StockImportDetail").del();

  // Chèn dữ liệu mẫu
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
  
  // Update inventory for each import detail
  const details = await knex("StockImportDetail").select("*");
  
  for (const detail of details) {
    // Check if inventory entry exists
    const inventory = await knex("Inventory")
      .where({ idLaptop: detail.idLaptop })
      .first();
    
    if (inventory) {
      // Use raw query with quoted identifiers to maintain case sensitivity
      await knex.raw(`UPDATE "Inventory" SET "soLuong" = "soLuong" + ? WHERE "idLaptop" = ?`, 
        [detail.soLuong, detail.idLaptop]);
    } else {
      // Create new inventory entry
      await knex("Inventory").insert({
        idLaptop: detail.idLaptop,
        soLuong: detail.soLuong,
        viTriKho: 'Kho chính'
      });
    }
  }
};