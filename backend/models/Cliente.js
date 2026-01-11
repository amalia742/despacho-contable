"use strict";

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipoPersona: {
      type: DataTypes.ENUM("fisica", "moral"),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo"),
      defaultValue: "activo",
    },
  });

  return Cliente;
};
