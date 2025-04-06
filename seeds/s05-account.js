/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'

exports.seed = async function (knex) {
  // Xoá toàn bộ dữ liệu cũ trong bảng Account
  await knex("Account").del();

  // Mã hoá mật khẩu
  const adminPassword = await bcrypt.hash("admin123", 10);
  const employeePassword = await bcrypt.hash("employee123", 10);

  // Chèn dữ liệu mẫu
  await knex("Account").insert([
    {
      idAccount: 1,
      username: "admin",
      matKhau: adminPassword,
      role: "admin"
    },
    {
      idAccount: 2,
      username: "employee1",
      matKhau: employeePassword,
      role: "casher"
    },
    {
      idAccount: 3,
      username: "employee2",
      matKhau: employeePassword,
      role: "casher"
    },
    {
      idAccount: 4,
      username: "employee3",
      matKhau: employeePassword,
      role: "warehouse"
    },
    {
      idAccount: 5,
      username: "employee4",
      matKhau: employeePassword,
      role: "warehouse"
    }
  ]);
};