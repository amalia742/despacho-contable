const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        message: "Correo y contraseña requeridos"
      });
    }

    const admin = await Admin.findOne({ where: { correo } });

    if (!admin) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    const passwordValida = await bcrypt.compare(password, admin.password);

    if (!passwordValida) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    const token = jwt.sign(
      { id: admin.id, rol: "admin" },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: admin.id,
        correo: admin.correo,
        rol: "admin"
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
