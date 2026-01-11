const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'despacho.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Error al conectar DB:", err);
  else console.log("Conectado a SQLite en:", dbPath);
});

// TABLA ADMIN
db.run(`
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    correo TEXT UNIQUE,
    password TEXT
  )
`);

// TABLA CITAS
db.run(`
  CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL
  )
`);

// TABLA EMPLEADOS
db.run(`
  CREATE TABLE IF NOT EXISTS empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    telefono TEXT,
    direccion TEXT,
    cargo TEXT NOT NULL,
    fechaIngreso TEXT
  )
`);

module.exports = db;
