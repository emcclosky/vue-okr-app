const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const userController = require("../controllers/users");

router.post("/profile", authMiddleware, userController.postProfile);

module.exports = router;
