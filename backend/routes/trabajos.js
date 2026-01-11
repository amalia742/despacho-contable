const express = require("express");
const router = express.Router();
const controller = require("../controllers/trabajo.Controller");

router.get("/", controller.obtenerTrabajos);
router.post("/", controller.crearTrabajo);

module.exports = router;
