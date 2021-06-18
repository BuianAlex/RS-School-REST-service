import path from 'path';

import { createConnection } from 'typeorm';
import 'reflect-metadata';

import config from '../common/config';

export const connection = createConnection({
  type: 'postgres',
  host: config.DB_HOST_NAME,
  port: +config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB,
  entities: [`${path.join(__dirname, '..')}/entities/**/*.ts`],
  synchronize: true,
});
