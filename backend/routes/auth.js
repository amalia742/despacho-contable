const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
const db = require("../database");

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  // 1️⃣ Buscar ADMIN
  const admin = await Admin.findOne({ where: { correo } });

  if (admin) {
    if (password !== admin.password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: admin.id, rol: "admin" },
      "secreto123",
      { expiresIn: "8h" }
    );

    return res.json({ token, rol: "admin" });
  }

  // 2️⃣ Buscar EMPLEADO
  db.get(`SELECT * FROM empleados WHERE correo = ?`, [correo], (err, emp) => {
    if (!emp) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const valido = bcrypt.compareSync(password, emp.password);
    if (!valido) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: emp.id, rol: "empleado" },
      "secreto123",
      { expiresIn: "8h" }
    );

    res.json({ token, rol: "empleado" });
  });
});

module.exports = router;
