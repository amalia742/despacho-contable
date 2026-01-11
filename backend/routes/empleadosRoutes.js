const express = require("express");
const router = express.Router();

const empleadoController = require("../controllers/empleadoController");

router.get("/", empleadoController.obtenerEmpleados);
router.post("/", empleadoController.crearEmpleado);

router.get("/:id", empleadoController.obtenerEmpleado);
router.put("/:id", empleadoController.actualizarEmpleado);
router.delete("/:id", empleadoController.eliminarEmpleado);

module.exports = router;
