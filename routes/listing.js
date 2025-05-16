const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing } = require("../utils/validateListing");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {clodinary,storage} = require("../cloudConfig.js");

const upload = multer({ storage });



router.route("/")
// INDEX
.get( wrapAsync(listingController.listingIndex))
// CREATE
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.listingCreate))




// NEW FORM
router.get("/new", isLoggedIn, listingController.listingNewform);

// EDIT FORM
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.listingEditRoute));



router.route("/:id")
// SHOW
.get( wrapAsync(listingController.listingShow))
// UPDATE
.put( isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.listingUpdate));

// DELETE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.listingDestroy));




module.exports = router;
