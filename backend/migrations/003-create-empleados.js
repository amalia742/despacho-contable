"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("empleados", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,   // ✔️ recomendado
      },

      telefono: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      direccion: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // ✔️ NUEVO CAMPO: contraseña
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // ✔️ NUEVO CAMPO: fecha de ingreso automática
      fechaIngreso: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("empleados");
  }
};
