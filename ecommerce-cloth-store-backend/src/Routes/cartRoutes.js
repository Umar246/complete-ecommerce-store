const express = require("express");
const router = express.Router();

const CartController = require("../Controllers/cartController.js");
const authenticate = require("../Middleware/authenticate.js");

router.get("/", authenticate, CartController.findUserCart);
router.put("/add", authenticate, CartController.addItemToCart);

module.exports = router;
