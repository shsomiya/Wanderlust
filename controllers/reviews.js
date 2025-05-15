//require

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.reviewPostRoute = async(req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new  Review (req.body.review);
    newReview.author = req.user._id;

    listing.review.push(newReview);

    await listing.save();
    await newReview.save();

    res.redirect(`/listing/${listing._id}`)
};

module.exports.reviewPostdelete = async(req,res)=>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`)
};
