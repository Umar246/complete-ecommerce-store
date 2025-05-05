const express = require("express");
const {
  createPaymentLink,
  updatePaymentInfo,
} = require("../Controllers/paymentController");
const authenticate = require("../Middleware/authenticate");
const router = express.Router();

router.post("/:id", authenticate, createPaymentLink);
router.post("/", authenticate, updatePaymentInfo);

module.exports = router;
