"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("facturas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      folio: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clientes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      iva: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM("pendiente", "pagada"),
        defaultValue: "pendiente",
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
    await queryInterface.dropTable("facturas");
  },
};
