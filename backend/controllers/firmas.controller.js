const { Firma, Cliente } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const firmas = await Firma.findAll({
      include: [
        {
          model: Cliente,
          as: "Cliente",
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json(firmas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener firmas", error });
  }
};

exports.create = async (req, res) => {
  try {
    const { clienteId, fechaInicio, fechaCaducidad, observaciones } = req.body;

    const firma = await Firma.create({
      clienteId,
      fechaInicio,
      fechaCaducidad,
      observaciones,
    });

    res.status(201).json(firma);
  } catch (error) {
    res.status(500).json({ message: "Error al crear firma", error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    await Firma.update(req.body, {
      where: { id },
    });

    res.json({ message: "Firma actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar firma", error });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Firma.destroy({
      where: { id },
    });

    res.json({ message: "Firma eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar firma", error });
  }
};
