const express = require("express");
const EmergencyController = require("../controllers/emergency_details_controller");
const router = express.Router();

router.post("/send", EmergencyController.sendDetails);

module.exports = router;
