const express = require("express");
const router = express.Router();
const firmasController = require("../controllers/firmas.controller");

router.get("/", firmasController.getAll);
router.post("/", firmasController.create);
router.put("/:id", firmasController.update);
router.delete("/:id", firmasController.remove);

module.exports = router;
