/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa toàn bộ dữ liệu cũ trong bảng Customer
  await knex("Customer").del();

  // Chèn dữ liệu giả
  await knex("Customer").insert([
    {
      idCustomer: 1,
      hoTen: "Trần Nguyễn Hoàng Diễn",
      SDT: "0987654321",
      diemThuong: 120,
      idLevel: 2,
    },
    {
      idCustomer: 2,
      hoTen: "Trần Đức Bình",
      SDT: "0976543210",
      diemThuong: 300,
      idLevel: 3,
    },
    {
      idCustomer: 3,
      hoTen: "Trần Đoàn Huy Phước",
      SDT: "0965432109",
      diemThuong: 50,
      idLevel: 1,
    },
    {
      idCustomer: 4,
      hoTen: "Nguyễn Trung Hiếu",
      SDT: "0954321098",
      diemThuong: 500,
      idLevel: 3,
    },
    {
      idCustomer: 5,
      hoTen: "Nguyễn Tiến Dũng",
      SDT: "0943210987",
      diemThuong: 190,
      idLevel: 2,
    },
    {
      idCustomer: 6,
      hoTen: "Trần Thị Kim Chi",
      SDT: "0932109876",
      diemThuong: 0,
      idLevel: 1,
    }, // Không có cấp độ thành viên
  ]);
};
