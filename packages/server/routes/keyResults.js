const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const keyResultsController = require("../controllers/keyResults");

router.post(
  "/key-results/key-result",
  authMiddleware,
  keyResultsController.postKeyResult
);

module.exports = router;
