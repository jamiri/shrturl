// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig = {
  client: 'postgresql',
  connection: {
    database: 'url',
    user:     'postgres',
    password: 'test',
    host:     'db',
    port:     5432
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

export default knexConfig;
