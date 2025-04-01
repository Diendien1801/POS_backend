/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Xóa toàn bộ dữ liệu cũ trong bảng StockImport
    await knex("StockImport").del();
  
    // Chèn dữ liệu mẫu
    await knex("StockImport").insert([
      {
        idPhieuNhap: 1,
        idContractor: 1,
        ngayNhap: "2025-03-25",
        tongTien: 45000000
      },
      {
        idPhieuNhap: 2,
        idContractor: 2,
        ngayNhap: "2025-03-27",
        tongTien: 65000000
      },
      {
        idPhieuNhap: 3,
        idContractor: 3,
        ngayNhap: "2025-03-30",
        tongTien: 30000000
      }
    ]);
  };