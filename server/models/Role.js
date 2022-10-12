const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Role;
