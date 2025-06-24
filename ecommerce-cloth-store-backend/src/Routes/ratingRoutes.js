const express = require("express");
const router = express.Router();

const RatingController = require("../Controllers/ratingController.js");
const authenticate = require("../Middleware/authenticate.js");

router.post("/create", authenticate, RatingController.createRating);
router.get("/product/:id", authenticate, RatingController.getAllRatings);

module.exports = router;
