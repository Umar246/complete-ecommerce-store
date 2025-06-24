const express = require("express");
const router = express.Router();

const CartItemController = require("../Controllers/cartItemController.js");
const authenticate = require("../Middleware/authenticate.js");

router.put("/:id", authenticate, CartItemController.updateCartITem);
router.delete("/:id", authenticate, CartItemController.removeCartITem);

module.exports = router;
