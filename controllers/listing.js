//require
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js"); // Add this to handle custom errors if needed



//index route

module.exports.listingIndex = async (req, res) => {
    const allLists = await Listing.find({});
    res.render("listing/index.ejs", { allLists });
};

//new from route

module.exports.listingNewform = (req, res) => {
    res.render("listing/form.ejs");
};
//create route

module.exports.listingCreate = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash('success', 'New Listing Created Successfully!');
    res.redirect("/listing");
};

//show route

module.exports.listingShow = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"review", populate:{path:"author", model: 'User'}}).populate("owner");
    if(!listing){
        req.flash('error', ' Listing isnot exit!');
        return res.redirect("/listing")
    }
    res.render("listing/show.ejs", { listing });
};

//edit route

module.exports.listingEditRoute = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the listing from the database
        const listing = await Listing.findById(id);
        
        // If listing not found, redirect with an error message
        if (!listing) {
            req.flash('error', 'Listing not found!');
            return res.redirect('/listing');
        }

       
        // Render the edit form with the listing data
        res.render("listing/edit.ejs", { listing });
    } catch (err) {
        req.flash('error', 'Error fetching the listing.');
        res.redirect('/listing');
    }
};

module.exports.listingUpdate = async (req, res) => {
    const { id } = req.params;
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { ...req.body.listing },
            { new: true }
        );

        if (!updatedListing) {
            req.flash('error', 'Listing not found!');
            return res.redirect(`/listing/${id}/edit`);
        }
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            updatedListing.image = { url, filename };
            await updatedListing.save();
        }
        req.flash('success', 'Listing updated successfully!');
        res.redirect(`/listing/${id}`);
};


module.exports.listingDestroy = async (req, res) => {
    const { id } = req.params;
    try {
        // Find and delete the listing
        const deletedListing = await Listing.findByIdAndDelete(id);

        // If listing not found, redirect with an error message
        if (!deletedListing) {
            req.flash('error', 'Listing not found!');
            return res.redirect('/listing');
        }

        // Flash a success message and redirect to the listings page
        req.flash('success', 'Listing deleted successfully!');
        res.redirect("/listing");
    } catch (err) {
        req.flash('error', 'Error deleting the listing.');
        res.redirect("/listing");
    }
};
