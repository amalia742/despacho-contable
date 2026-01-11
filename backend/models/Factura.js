module.exports = (sequelize, DataTypes) => {
  const Factura = sequelize.define(
    "Factura",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      folio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      iva: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM("pendiente", "pagada"),
        defaultValue: "pendiente",
      },
    },
    {
      tableName: "facturas",
    }
  );

  Factura.associate = (models) => {
    Factura.belongsTo(models.Cliente, {
      foreignKey: "clienteId",
    });
  };

  return Factura;
};
