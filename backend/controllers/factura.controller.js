const { Factura, Cliente } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      include: Cliente,
      order: [["id", "DESC"]],
    });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const factura = await Factura.create(req.body);
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) {
      return res.status(404).json({ msg: "Factura no encontrada" });
    }

    await factura.update(req.body);
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) {
      return res.status(404).json({ msg: "Factura no encontrada" });
    }

    await factura.destroy();
    res.json({ msg: "Factura eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
