/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Xóa toàn bộ dữ liệu cũ trong bảng Employee
  await knex("Employee").del();
  
  // Chèn dữ liệu mẫu
  await knex("Employee").insert([
    {
      idNhanVien: 1,
      tenNhanVien: "Nguyễn Văn Quản Lý",
      tenVaTro: "Quản lý cửa hàng",
      CCCD: "079123456789",
      DOB: "1990-01-15",
      diaChi: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      gioiTinh: "Nam",
      sdt: "0901234567",
      email: "quanly@laptopstore.com",
      salary: 25000000,
      idAccount: 1, // Link to admin account
      hinhAnh: "avatar1.jpg"
    },
    {
      idNhanVien: 2,
      tenNhanVien: "Trần Thị Nhân Viên",
      tenVaTro: "Nhân viên bán hàng",
      CCCD: "079234567891",
      DOB: "1995-05-20",
      diaChi: "456 Đường Lê Lợi, Quận 1, TP.HCM",
      gioiTinh: "Nữ", 
      sdt: "0912345678",
      email: "nhanvien1@laptopstore.com",
      salary: 12000000,
      idAccount: 2, // Link to employee1 account
      hinhAnh: "avatar2.jpg"
    },
    {
      idNhanVien: 3,
      tenNhanVien: "Lê Văn Kho",
      tenVaTro: "Nhân viên kho hàng",
      CCCD: "079345678912",
      DOB: "1992-08-10",
      diaChi: "789 Đường Hai Bà Trưng, Quận 3, TP.HCM",
      gioiTinh: "Nam",
      sdt: "0923456789",
      email: "kho@laptopstore.com",
      salary: 10000000,
      idAccount: 3, // Link to employee2 account
      hinhAnh: "avt4.jpg"
    },
    {
      idNhanVien: 4,
      tenNhanVien: "Phạm Thị Kế Toán",
      tenVaTro: "Kế toán viên",
      CCCD: "079456789123",
      DOB: "1993-11-25",
      diaChi: "101 Đường Nguyễn Du, Quận 1, TP.HCM",
      gioiTinh: "Nữ",
      sdt: "0934567890",
      email: "ketoan@laptopstore.com",
      salary: 15000000,
      idAccount: 4, // May need to add this account to account seed
      hinhAnh: "default.png"
    },
    {
      idNhanVien: 5,
      tenNhanVien: "Trương Văn Kỹ Thuật",
      tenVaTro: "Kỹ thuật viên",
      CCCD: "079567891234",
      DOB: "1997-03-18",
      diaChi: "202 Đường Lý Tự Trọng, Quận 1, TP.HCM",
      gioiTinh: "Nam",
      sdt: "0945678901",
      email: "kythuat@laptopstore.com",
      salary: 13500000,
      idAccount: 5, // May need to add this account to account seed
      hinhAnh: "default.png"
    }
  ]);
  
  // Check and add corresponding accounts if they don't exist
  const account4 = await knex("Account").where({ idAccount: 4 }).first();
  if (!account4) {
    await knex("Account").insert({
      idAccount: 4,
      username: "ketoan",
      matKhau: "$2a$10$IhHZJVCZcyRl/X03G5N9Ue5RMgUNF7BxMdA4blK6hxgFLTLsW3EYy", // from bcryptjs
      role: "employee"
    });
  }
  
  const account5 = await knex("Account").where({ idAccount: 5 }).first();
  if (!account5) {
    await knex("Account").insert({
      idAccount: 5,
      username: "kythuat",
      matKhau: "$2a$10$IhHZJVCZcyRl/X03G5N9Ue5RMgUNF7BxMdA4blK6hxgFLTLsW3EYy", // from bcryptjs
      role: "employee"
    });
  }
};