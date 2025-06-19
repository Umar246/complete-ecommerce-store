const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/productController");
const authenticate = require("../Middleware/authenticate");

router.get("/", ProductController.getAllProducts);
router.get("/id/:id", ProductController.findProductById);
router.get("/categories", ProductController.fetchCategories);

module.exports = router;
