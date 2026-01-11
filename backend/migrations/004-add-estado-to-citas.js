'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Citas', 'estado', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Citas', 'estado');
  }
};
