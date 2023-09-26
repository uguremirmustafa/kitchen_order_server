import knex from 'knex';
import knexConfig from './knexfile';

const configEnv = process.env.NODE_ENV as string;
const db = knex(knexConfig[configEnv]);

export default db;
