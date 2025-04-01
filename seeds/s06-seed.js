/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Xóa toàn bộ dữ liệu cũ trong bảng Contractor
    await knex("Contractor").del();
  
    // Chèn dữ liệu mẫu
    await knex("Contractor").insert([
      {
        idContractor: 1,
        field: "Công ty TNHH Phân Phối Laptop Việt Nam"
      },
      {
        idContractor: 2,
        field: "Công ty Cổ phần Thương mại Điện tử Laptop"
      },
      {
        idContractor: 3,
        field: "Đại lý Phân phối Laptop Miền Nam"
      }
    ]);
  };