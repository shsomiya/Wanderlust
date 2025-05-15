const listings = require("./routes/listing.js");
const Review = require("./models/review.js");
const Listing = require("./models/listing.js");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirecturl = req.originalUrl;  // FIXED: typo `orginalUrl` -> `originalUrl`
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");              // FIXED: added `return` to prevent next() from running
    }
    return next();
};

// Middleware to save the redirect URL in `res.locals`
module.exports.saveRedirecturl = (req, res, next) => {
    if (req.session.redirecturl) {
        res.locals.redirecturl = req.session.redirecturl;  // FIXED: `req.locals` -> `res.locals`
    }
    next();
};


module.exports.isOwner = async(req,res,next)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing && listing.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","You are not the owner  of this listing")
        return res.redirect(`/listing/${id}`)
    

}
next()
};
  

module.exports.isReviewAuthor = async(req,res,next)=>{
    let{id,reviewId} = req.params;
    const foundReview = await Review.findById(reviewId);
    if (!foundReview.author._id.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listing/${id}`);
    }
next()
};
  