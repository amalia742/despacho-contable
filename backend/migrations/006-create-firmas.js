"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("firmas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clientes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaCaducidad: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "vigente",
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
    await queryInterface.dropTable("firmas");
  },
};
