exports.up = async function(knex) {
  await knex.raw(`
      CREATE ROLE anon nologin;

      -- Cấp quyền sử dụng schema public
      GRANT USAGE ON SCHEMA public TO anon;

      -- Cấp quyền SELECT cho tất cả các bảng trong schema public
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

      -- Cấp quyền INSERT, UPDATE, DELETE cho tất cả các bảng trong schema public
      GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;

      -- Cấp quyền TRUNCATE cho tất cả các bảng trong schema public
      GRANT TRUNCATE ON ALL TABLES IN SCHEMA public TO anon;

      -- Cấp quyền REFERENCES cho tất cả các bảng trong schema public (nếu cần thiết)
      GRANT REFERENCES ON ALL TABLES IN SCHEMA public TO anon;

      -- Cấp quyền TRIGGER cho tất cả các bảng trong schema public (nếu cần thiết)
      GRANT TRIGGER ON ALL TABLES IN SCHEMA public TO anon;

      -- Cấp quyền EXECUTE cho tất cả các hàm trong schema public
      GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon;

      -- Cấp quyền USAGE cho tất cả các sequence trong schema public
      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
  `);
};

exports.down = async function(knex) {
  await knex.raw(`
      DROP ROLE anon;
  `);
};