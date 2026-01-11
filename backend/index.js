require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const citasRoutes = require('./routes/citas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/citas', citasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
