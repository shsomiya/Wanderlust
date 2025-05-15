const mongoose = require("mongoose");
const initData = require ("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB Connection Error:", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
     const dataWithOwner = initData.data.map((obj)=>({...obj,owner:'681025981b3c0ee06e637c15'})

    )
    await Listing.insertMany(dataWithOwner);
    console.log("data was initatized")
}

initDB();