const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const Ad = sequelize.define('ad', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Ad;
