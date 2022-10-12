const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DEV_DB_NAME,
  process.env.DEV_DB_USER,
  process.env.DEV_DB_PASS,
  {
    port: process.env.DEV_DB_PORT,
    host: process.env.DEV_DB_HOST,
    dialect: 'mysql',
  }
);

module.exports = sequelize;
