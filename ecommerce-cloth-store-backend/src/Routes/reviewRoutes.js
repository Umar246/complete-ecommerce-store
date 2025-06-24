const express = require("express");
const router = express.Router();

const ReviewController = require("../Controllers/reviewController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/create", authenticate, ReviewController.createReview);
router.get("/product/:id", authenticate, ReviewController.getAllReviews);

module.exports = router;
