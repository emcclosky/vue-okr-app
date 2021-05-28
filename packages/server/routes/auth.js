const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/reset/:token?", authController.getNewPassword);
router.post("/reset", authController.postPasswordReset);
router.post("/new-password", authController.postNewPassword);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/auth/google", authController.googleAuth);
router.get("/auth/google/callback", authController.callback);

module.exports = router;
