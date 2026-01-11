module.exports = (sequelize, DataTypes) => {
  const Cita = sequelize.define(
    "Cita",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      hora: {
        type: DataTypes.STRING, // "08:00"
        allowNull: false,
      },

      estado: {
        type: DataTypes.ENUM(
          "pendiente",
          "confirmada",
          "cancelada"
        ),
        defaultValue: "pendiente",
      },
    },
    {
      tableName: "citas",
      timestamps: true,
    }
  );

  return Cita;
};
