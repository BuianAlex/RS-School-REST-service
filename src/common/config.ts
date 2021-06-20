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

export default {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
};
