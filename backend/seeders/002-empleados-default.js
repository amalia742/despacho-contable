"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash("Aa12345", 10);

    await queryInterface.bulkInsert("empleados", [
      {
        nombre: "Administrador",
        correo: "admin123@admin.com",
        telefono: "0000000000",
        direccion: "Oficina",
        cargo: "Administrador",
        password: password,
        fechaIngreso: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("empleados", { correo: "admin123@admin.com" });
  },
};
