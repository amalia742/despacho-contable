const db = require("../database");

exports.obtenerTrabajos = (req, res) => {
  db.all("SELECT * FROM trabajos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.crearTrabajo = (req, res) => {
  const { cliente_id, descripcion } = req.body;

  db.run(
    `INSERT INTO trabajos (cliente_id, descripcion) VALUES (?, ?)`,
    [cliente_id, descripcion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};
