'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {}
  Admin.init({
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admins'
  });
  return Admin;
};
