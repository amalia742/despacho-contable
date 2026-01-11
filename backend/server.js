const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/admin", require("./routes/admin"));
app.use("/api/citas", require("./routes/citas"));
app.use("/api/empleados", require("./routes/empleadosRoutes"));
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/pdf", require("./routes/pdf"));
app.use("/api/firmas", require("./routes/firmas.routes"));
app.use("/api/facturas", require("./routes/facturas.routes"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
