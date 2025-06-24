const express = require("express");
const {
  createPaymentLink,
  updatePaymentInfo,
} = require("../Controllers/paymentController.js");
const authenticate = require("../Middleware/authenticate.js");
const router = express.Router();

router.post("/:id", authenticate, createPaymentLink);
router.post("/", authenticate, updatePaymentInfo);

module.exports = router;
