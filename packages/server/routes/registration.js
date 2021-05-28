const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registration");

router.post("/register", registrationController.postRegistration);

module.exports = router;
