const { Empleado } = require("../models");

module.exports = {
  async obtenerEmpleados(req, res) {
    try {
      const empleados = await Empleado.findAll();
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo empleados" });
    }
  },

  async crearEmpleado(req, res) {
    try {
      const empleado = await Empleado.create(req.body);
      res.json(empleado);
    } catch (error) {
      res.status(500).json({ error: "Error creando empleado" });
    }
  },

  async obtenerEmpleado(req, res) {
    try {
      const empleado = await Empleado.findByPk(req.params.id);
      res.json(empleado);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo empleado" });
    }
  },

  async actualizarEmpleado(req, res) {
    try {
      await Empleado.update(req.body, { where: { id: req.params.id } });
      res.json({ mensaje: "Empleado actualizado" });
    } catch (error) {
      res.status(500).json({ error: "Error actualizando empleado" });
    }
  },

  async eliminarEmpleado(req, res) {
    try {
      await Empleado.destroy({ where: { id: req.params.id } });
      res.json({ mensaje: "Empleado eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando empleado" });
    }
  },
};
