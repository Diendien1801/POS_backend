/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa toàn bộ dữ liệu và reset IDENTITY
  await knex.raw('TRUNCATE TABLE "Manufacturer" RESTART IDENTITY CASCADE');

  // Chèn dữ liệu mới
  await knex('Manufacturer').insert([
    { tenNhaSanXuat: 'Dell' },
    { tenNhaSanXuat: 'HP' },
    { tenNhaSanXuat: 'Apple' },
    { tenNhaSanXuat: 'Microsoft' },
    { tenNhaSanXuat: 'Razer' },
    { tenNhaSanXuat: 'Acer' },
    { tenNhaSanXuat: 'Asus' }
  ]);
};
