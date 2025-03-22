module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'myshop',
      user:     'postgres',
      password: '1234'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}