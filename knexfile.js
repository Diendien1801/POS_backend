module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      database: "myshop",
      user: "postgres",
      password: "1234",
      port: process.env.POSTGRES_PORT || 5432,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};