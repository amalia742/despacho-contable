const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Admin } = require("../models");
const Empleado = require("../models/Empleado");

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  // 🔹 Buscar ADMIN
  const admin = await Admin.findOne({ where: { correo } });

  if (admin) {
    const valido = await bcrypt.compare(password, admin.password);
    if (!valido)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: admin.id, rol: "admin" },
      "secreto123",
      { expiresIn: "8h" }
    );

    return res.json({ token, rol: "admin" });
  }

  // 🔹 Buscar EMPLEADO
  const empleado = await Empleado.findOne({ where: { correo } });

  if (empleado) {
    const valido = await bcrypt.compare(password, empleado.password);
    if (!valido)
      return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: empleado.id, rol: "empleado" },
      "secreto123",
      { expiresIn: "8h" }
    );

    return res.json({ token, rol: "empleado" });
  }

  return res.status(401).json({ message: "Usuario no autorizado" });
});

module.exports = router;
