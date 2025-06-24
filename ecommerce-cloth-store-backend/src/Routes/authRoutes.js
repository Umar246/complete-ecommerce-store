const express = require("express");
const router = express.Router();

const AuthController = require("../Controllers/authController.js");

router.post("/signup", AuthController.register);
router.post("/signin", AuthController.login);

module.exports = router;
