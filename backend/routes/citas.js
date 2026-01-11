const express = require("express");
const router = express.Router();

const citasController = require("../controllers/citasController");

router.get("/", citasController.getCitas);
router.post("/", citasController.crearCita);
router.get("/ocupadas/:fecha", citasController.obtenerCitasPorFecha);
router.put("/:id/confirmar", citasController.confirmarCita);
router.put("/:id/cancelar", citasController.cancelarCita);
router.put("/:id/reagendar", citasController.reagendarCita);

module.exports = router;
