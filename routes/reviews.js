//require

const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const {validateReview} = require("../utils/validateListing");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
const listingController = require("../controllers/listing.js");


//review/post route

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.reviewPostRoute));


//delete review route

router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewController.reviewPostdelete));

//exports

module.exports = router;
