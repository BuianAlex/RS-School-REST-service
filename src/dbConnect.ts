import { Sequelize } from 'sequelize';

const { DB, DB_USER, DB_HOST_NAME, DB_PORT, DB_PASSWORD } = process.env;

if (!DB || !DB_USER || !DB_HOST_NAME || !DB_PORT || !DB_PASSWORD) {
  throw new Error('Error in the db config');
}

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST_NAME,
  port: +DB_PORT,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
