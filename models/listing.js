const mongoose = require("mongoose");
const review = require("./review");
const { listingSchema } = require("../utils/joiSchema");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    }
    ,
    description: {
        type: String,
        required: true
    },
    // In your model (list.js)
    image: {
        url:String,
        filename: String
      
    },
    location: String,
    country: String,

    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    latitude: Number,
    longitude: Number
});


listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.review}})
    }
});

module.exports= mongoose.model("Listing", listSchema);
