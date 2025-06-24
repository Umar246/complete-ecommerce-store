const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController.js');

router.get("/", UserController.getAllUsers);
router.get("/profile", UserController.getUserProfile);
router.put("/update-role", UserController.updateRole);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;
