const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/productController");
const authenticate = require("../Middleware/authenticate");

router.get("/", authenticate, ProductController.getAllProducts);
router.get("/id/:id", authenticate, ProductController.findProductById);
router.get("/categories", authenticate, ProductController.fetchCategories);

module.exports = router;
