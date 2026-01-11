"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: "cliente" }
  }, {});
  return Usuario;
};
