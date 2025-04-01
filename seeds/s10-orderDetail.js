/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Xóa toàn bộ dữ liệu cũ trong bảng OrderDetail
  await knex("OrderDetail").del();
  
  // Chèn dữ liệu mẫu
  await knex("OrderDetail").insert([
    {
      idOrderDetail: 1,
      idOrder: 1,
      idLaptop: 1,
      soLuong: 1,
      donGia: 15000000,
      thanhTien: 15000000
    },
    {
      idOrderDetail: 2,
      idOrder: 1,
      idLaptop: 2,
      soLuong: 1,
      donGia: 30000000,
      thanhTien: 30000000
    },
    {
      idOrderDetail: 3,
      idOrder: 2,
      idLaptop: 2,
      soLuong: 2,
      donGia: 32500000,
      thanhTien: 65000000
    },
    {
      idOrderDetail: 4,
      idOrder: 3,
      idLaptop: 3,
      soLuong: 1,
      donGia: 30000000,
      thanhTien: 30000000
    }
  ]);
  
  // Update inventory for each order detail
  const orderDetails = await knex("OrderDetail").select("*");
  
  for (const detail of orderDetails) {
    // Decrease inventory
    const inventory = await knex("Inventory")
      .where({ idLaptop: detail.idLaptop })
      .first();
    
    if (inventory) {
      // Use raw query with quoted identifiers to maintain case sensitivity
      await knex.raw(`UPDATE "Inventory" SET "soLuong" = "soLuong" - ? WHERE "idLaptop" = ?`, 
        [detail.soLuong, detail.idLaptop]);
    } else {
      // Create new inventory with negative value (will be balanced by stock imports)
      await knex("Inventory").insert({
        idLaptop: detail.idLaptop,
        soLuong: -detail.soLuong,
        viTriKho: 'Kho chính'
      });
    }
  }
};