const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrar = (req, res) => {
  const { nombre, correo, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, 'contador')`;

  db.run(sql, [nombre, correo, hash], function (err) {
    if (err) return res.status(500).json({ message: "Error al registrar" });

    res.json({ message: "Usuario registrado correctamente" });
  });
};

exports.login = (req, res) => {
  const { correo, password } = req.body;

  db.get(`SELECT * FROM usuarios WHERE correo = ?`, [correo], (err, user) => {
    if (err || !user) return res.status(400).json({ message: "Credenciales invalidas" });

    const valido = bcrypt.compareSync(password, user.password);

    if (!valido) return res.status(400).json({ message: "Password incorrecto" });

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      "secreto123",
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  });
};
