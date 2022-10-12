const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const Job = sequelize.define('job', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requirement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Job;
