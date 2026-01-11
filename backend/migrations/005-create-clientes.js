"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clientes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      clave: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      rfc: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      curp: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tipoPersona: {
        type: Sequelize.ENUM("fisica", "moral"),
        allowNull: false,
      },

      correo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      telefono: {
        type: Sequelize.STRING,
      },

      direccion: {
        type: Sequelize.TEXT,
      },

      estado: {
        type: Sequelize.ENUM("activo", "inactivo"),
        defaultValue: "activo",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("clientes");
  },
};
