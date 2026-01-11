module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define("Empleado", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaIngreso: {
      type: DataTypes.DATEONLY,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Empleado;
};

