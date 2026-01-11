const { Cliente } = require("../models");

// LISTAR
exports.listar = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREAR
exports.crear = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ACTUALIZAR
exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.update(req.body, { where: { id } });
    res.json({ mensaje: "Cliente actualizado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ELIMINAR
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.destroy({ where: { id } });
    res.json({ mensaje: "Cliente eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
