"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash("Aa12345", 10);

    const admin = await queryInterface.sequelize.query(
      `SELECT * FROM Admins WHERE correo = 'admin123@admin.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (admin.length === 0) {
      return queryInterface.bulkInsert("Admins", [
        {
          correo: "admin123@admin.com",
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Admins", {
      correo: "admin123@admin.com",
    });
  },
};
