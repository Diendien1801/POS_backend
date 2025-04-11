//// filepath: d:\POS_backend\seeds\s13-promotion.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Clear old data
    await knex('Promotion').del();
  
    // Insert sample promotions
    await knex('Promotion').insert([
      {
        idPromotion: 1,
        tenKhuyenMai: 'Early Bird Discount',
        moTa: 'Discount for early customers',
        diemDoi: 500,
        giaTriGiam: 20000,
        ngayBatDau: '2025-01-01',
        ngayKetThuc: '2025-04-30'
      },
      {
        idPromotion: 2,
        tenKhuyenMai: 'Holiday Special',
        moTa: 'Year-end holiday promotion',
        diemDoi: 800,
        giaTriGiam: 35000,
        ngayBatDau: '2025-12-01',
        ngayKetThuc: '2025-12-31'
      }
    ]);
  };