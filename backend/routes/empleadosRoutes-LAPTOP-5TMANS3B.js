const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Empleado } = require("../models");

const router = express.Router();

/* ===============================
   LOGIN EMPLEADO ✅ (ESTO FALTABA)
================================ */
router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const empleado = await Empleado.findOne({ where: { correo } });

    if (!empleado) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const valido = await bcrypt.compare(password, empleado.password);
    if (!valido) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      {
        id: empleado.id,
        rol: "empleado",
      },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "8h" }
    );

    res.json({
      token,
      usuario: {
        id: empleado.id,
        nombre: empleado.nombre,
        rol: "empleado",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/* ===============================
   OBTENER EMPLEADOS
================================ */
router.get("/", async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      order: [["id", "DESC"]],
    });
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/* ===============================
   CREAR EMPLEADO
================================ */
router.post("/", async (req, res) => {
  try {
    const {
      nombre,
      correo,
      telefono,
      direccion,
      cargo,
      fechaIngreso,
      password,
    } = req.body;

    if (!nombre || !correo || !cargo || !password) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }

    const existe = await Empleado.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ message: "El correo ya existe" });
    }

    const hash = await bcrypt.hash(password, 10);

    const empleado = await Empleado.create({
      nombre,
      correo,
      telefono,
      direccion,
      cargo,
      fechaIngreso,
      password: hash,
    });

    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/* ===============================
   ACTUALIZAR EMPLEADO
================================ */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.password && data.password !== "") {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    await Empleado.update(data, { where: { id } });

    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/* ===============================
   ELIMINAR EMPLEADO
================================ */
router.delete("/:id", async (req, res) => {
  try {
    await Empleado.destroy({ where: { id: req.params.id } });
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
