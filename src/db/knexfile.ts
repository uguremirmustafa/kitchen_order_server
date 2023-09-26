import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
