import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  DB_HOST_NAME,
  DB_PORT,
  DB,
  DB_USER,
  DB_PASSWORD,
} = process.env;

if (!DB || !DB_USER || !DB_HOST_NAME || !DB_PORT || !DB_PASSWORD) {
  throw new Error('Error app env');
}

export default {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  DB,
  DB_USER,
  DB_HOST_NAME,
  DB_PORT,
  DB_PASSWORD,
};
