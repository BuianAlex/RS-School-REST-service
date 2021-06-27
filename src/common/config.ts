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
} = process.env;

if (
  !PORT ||
  !NODE_ENV ||
  !MONGO_CONNECTION_STRING ||
  !AUTH_MODE ||
  !JWT_SECRET_KEY
) {
  throw new Error('Error app env');
}

export default {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
};
