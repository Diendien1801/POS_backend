// seeds/02_stock_imports_and_details.js
// Generate stock imports and corresponding details for all laptops in database

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Clear existing data
  await knex('StockImportDetail').del();
  await knex('StockImport').del();

  // Create a handful of stock import batches
  const stockImports = [
    { idPhieuNhap: 1, idContractor: 1, ngayNhap: '2025-03-15', tongTien: 0 },
    { idPhieuNhap: 2, idContractor: 2, ngayNhap: '2025-04-01', tongTien: 0 },
    { idPhieuNhap: 3, idContractor: 3, ngayNhap: '2025-04-10', tongTien: 0 }
  ];
  await knex('StockImport').insert(stockImports);

  // Fetch all laptops to seed import details dynamically
  const laptops = await knex('Laptop').select('idLaptop', 'gia');
  const details = [];
  let detailId = 1;

  // For each import batch, create one detail per laptop with random quantity and cost
  for (const imp of stockImports) {
    let batchTotal = 0;
    for (const lap of laptops) {
      // random quantity between 10 and 100
      const qty = Math.floor(Math.random() * 91) + 10;
      // import price at 70–90% of listed price
      const cost = Math.floor(lap.gia * (Math.random() * 0.2 + 0.7));
      batchTotal += qty * cost;
      details.push({
        idStockImportDetail: detailId++,
        idPhieuNhap: imp.idPhieuNhap,
        idLaptop: lap.idLaptop,
        soLuong: qty,
        giaNhap: cost
      });
    }
    // Update tongTien for this batch
    await knex('StockImport')
      .where('idPhieuNhap', imp.idPhieuNhap)
      .update({ tongTien: batchTotal });
  }

  // Insert all generated import details
  await knex('StockImportDetail').insert(details);
};
