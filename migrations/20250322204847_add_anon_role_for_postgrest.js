/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_catalog.pg_roles WHERE rolname = 'anon'
        ) THEN
          CREATE ROLE anon NOLOGIN;
        END IF;
      END
      $$;
  
      GRANT USAGE ON SCHEMA public TO anon;
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
    `);
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.raw(`
      DROP ROLE IF EXISTS anon;
    `);
  };
  