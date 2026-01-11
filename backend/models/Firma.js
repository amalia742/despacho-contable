module.exports = (sequelize, DataTypes) => {
  const Firma = sequelize.define(
    "Firma",
    {
      fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fechaCaducidad: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "vigente",
      },
    },
    {
      tableName: "firmas",
    }
  );

  Firma.associate = (models) => {
    Firma.belongsTo(models.Cliente, {
      foreignKey: "clienteId",
      as: "Cliente",
    });
  };

  return Firma;
};
