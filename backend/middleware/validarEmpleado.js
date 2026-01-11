module.exports = (req, res, next) => {
  if (!req.body.nombre || !req.body.correo) {
    return res.status(400).json({ error: "Faltan datos del empleado" });
  }
  next();
};
