const express = require("express");
const router = express.Router();

const eyesController = require("../controllers/eyesController");

router.get("/", eyesController.getEyesList);
router.get("/filter", eyesController.getEyesResultByFilter);

module.exports = router;
