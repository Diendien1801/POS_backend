/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa toàn bộ dữ liệu cũ trong bảng OrderDetail trước để tránh lỗi khóa ngoại
  await knex("OrderDetail").del();
  await knex("Order").del();

  // Chèn dữ liệu vào bảng Order
  await knex("Order").insert([
    {
      idOrder: 1,
      idCustomer: 1,
      idEmployee: null,
      trangThai: "Đã xác nhận",
      ngayDatHang: "2025-03-31",
      tongTien: 15000000,
      hinhThucThanhToan: "Chuyển khoản",
      idPromotion: null,
    },
    {
      idOrder: 2,
      idCustomer: 3,
      idEmployee: null,
      trangThai: "Đang giao",
      ngayDatHang: "2025-03-30",
      tongTien: 22000000,
      hinhThucThanhToan: "Tiền mặt",
      idPromotion: null,
    },
  ]);

  // Chèn dữ liệu vào bảng OrderDetail
  await knex("OrderDetail").insert([
    {
      idOrderDetail: 1,
      idOrder: 1,
      idLaptop: 1,
      soLuong: 1,
      donGia: 15000000,
      thanhTien: 15000000,
    },
    {
      idOrderDetail: 2,
      idOrder: 2,
      idLaptop: 2,
      soLuong: 2,
      donGia: 11000000,
      thanhTien: 22000000,
    },
  ]);
};
