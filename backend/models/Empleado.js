module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define("Empleado", {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    cargo: DataTypes.STRING,
    fechaIngreso: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Empleado;
};
