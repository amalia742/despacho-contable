"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trabajo = sequelize.define("Trabajo", {
    cliente_id: { type: DataTypes.INTEGER, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "pendiente" }
  }, {});
  Trabajo.associate = function(models) {
    Trabajo.belongsTo(models.Cliente, { foreignKey: "cliente_id", as: "cliente" });
  };
  return Trabajo;
};
