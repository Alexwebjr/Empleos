const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
  }
);

module.exports = User;
