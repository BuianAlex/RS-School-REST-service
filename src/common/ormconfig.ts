/* eslint-disable dot-notation */
import path from 'path';

import dotenv from 'dotenv';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { DB_HOST_NAME, DB_PORT, DB_PASSWORD, DB_USER, DB } = process.env;

if (!DB || !DB_USER || !DB_HOST_NAME || !DB_PORT || !DB_PASSWORD) {
  throw new Error('Error app env');
}

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: DB_HOST_NAME,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB,
  entities: [`${path.join(__dirname, '..')}/entities/**/*.ts`],
  subscribers: [`src/subscriber/*.ts`],
  synchronize: false,
  migrations: [`src/migration/*.ts`],
  cli: {
    migrationsDir: `src/migration`,
  },
};

export default config;
