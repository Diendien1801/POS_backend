exports.up = function(knex) {
    return knex.schema.table('Promotion', function(table) {
      table.dropColumn('diemDoi');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('Promotion', function(table) {
      table.integer('diemDoi'); // Nếu rollback thì thêm lại cột
    });
  };
  