import * as path from 'path';
import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { ColumnEnt } from '../columns/entities/column.entity';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { DB_HOST_NAME, DB_PORT, DB_PASSWORD, DB_USER, DB } = process.env;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: DB_HOST_NAME || 'localhost',
  port: DB_PORT ? +DB_PORT : 5433,
  username: DB_USER || 'test-user',
  password: DB_PASSWORD || 'test-user-password',
  database: DB || 'test-db',
  entities: [User, Board, Task, ColumnEnt],
  subscribers: [`dist/subscriber/*.{ts,js}`],
  synchronize: false,
  // migrationsRun: true,
  migrations: [`dist/migration/*.{ts,js}`],
  cli: {
    migrationsDir: `src/migration`,
  },
};

export default config;
