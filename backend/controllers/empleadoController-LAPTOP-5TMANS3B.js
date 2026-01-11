const bcrypt = require("bcrypt");
const { Empleado } = require("../models");

/* ===============================
   OBTENER EMPLEADOS
================================ */
exports.obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      attributes: { exclude: ["password"] }
    });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados" });
  }
};

/* ===============================
   CREAR EMPLEADO
================================ */
exports.crearEmpleado = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      telefono,
      direccion,
      cargo,
      fechaIngreso,
      password
    } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: "Campos obligatorios" });
    }

    // 🔐 ENCRIPTAR PASSWORD
    const passwordHash = await bcrypt.hash(password, 10);

    const empleado = await Empleado.create({
      nombre,
      correo,
      telefono,
      direccion,
      cargo,
      fechaIngreso,
      password: passwordHash
    });

    res.json({
      message: "Empleado creado correctamente",
      empleado
    });

  } catch (error) {
    res.status(500).json({ message: "Error al crear empleado" });
  }
};

/* ===============================
   ACTUALIZAR EMPLEADO
================================ */
exports.actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    // Si viene password → encriptar
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await Empleado.update(data, { where: { id } });

    res.json({ message: "Empleado actualizado" });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar empleado" });
  }
};

/* ===============================
   ELIMINAR EMPLEADO
================================ */
exports.eliminarEmpleado = async (req, res) => {
  try {
    await Empleado.destroy({ where: { id: req.params.id } });
    res.json({ message: "Empleado eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar empleado" });
  }
};
