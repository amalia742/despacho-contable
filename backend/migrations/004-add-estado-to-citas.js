'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('citas', 'estado', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('citas', 'estado');
  }
};
