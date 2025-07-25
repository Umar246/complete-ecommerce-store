const express = require("express");
const router = express.Router();

const AdminProductController = require("../Controllers/productController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/", authenticate, AdminProductController.createProduct);
router.post(
  "/creates",
  authenticate,
  AdminProductController.createMultipleProducts
);
router.delete("/:id", authenticate, AdminProductController.deleteProduct);
router.put("/:id", authenticate, AdminProductController.updateProduct);

module.exports = router;
