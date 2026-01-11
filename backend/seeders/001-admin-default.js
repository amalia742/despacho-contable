"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar si el admin ya existe
    const admin = await queryInterface.sequelize.query(
      `SELECT * FROM Admins WHERE correo = "pabloamalia053@gmail.com";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (admin.length === 0) {
      // Insertar solo si NO existe
      return queryInterface.bulkInsert("Admins", [
        {
          correo: "admin123@admin.com",
          password: "Aa12345",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log("Admin ya existe, no se insertó nuevamente.");
      return Promise.resolve();
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Admins", { correo: "admin@admin.com" });
  }
};
