const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./despacho.db");

// Crear tablas
db.despachodb(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL DEFAULT 'cliente',
      creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      telefono TEXT,
      correo TEXT,
      creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS trabajos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      descripcion TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'pendiente',
      creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellidoP TEXT NOT NULL,
      apellidoM TEXT NOT NULL,
      correo TEXT NOT NULL,
      telefono TEXT NOT NULL,
      direccion TEXT NOT NULL,
      asunto TEXT NOT NULL,
      fecha TEXT NOT NULL,
      hora TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
