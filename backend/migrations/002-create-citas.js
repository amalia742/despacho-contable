'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('citas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: { type: Sequelize.STRING, allowNull: false },
      correo: { type: Sequelize.STRING, allowNull: false },
      fecha: { type: Sequelize.STRING, allowNull: false },
      hora: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('citas');
  }
};
