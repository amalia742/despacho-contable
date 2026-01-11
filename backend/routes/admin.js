const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  const admin = await Admin.findOne({ where: { correo, password } });

  if (!admin) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  res.json({
    message: "Login exitoso",
    admin: {
      id: admin.id,
      nombre: admin.nombre,
      correo: admin.correo
    }
  });
});

module.exports = router;
