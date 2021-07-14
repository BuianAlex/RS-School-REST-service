import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { PORT, NODE_ENV, JWT_SECRET_KEY, AUTH_MODE, USE_FASTIFY } = process.env;

interface IConfig {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET_KEY: string;
  AUTH_MODE: boolean | string;
  USE_FASTIFY: boolean;
}

export const config: IConfig = {
  PORT: PORT ? +PORT : 4000,
  NODE_ENV: NODE_ENV || 'development',
  JWT_SECRET_KEY: JWT_SECRET_KEY || 'secret-key',
  AUTH_MODE: AUTH_MODE || false,
  USE_FASTIFY: Boolean(USE_FASTIFY) || false,
};
