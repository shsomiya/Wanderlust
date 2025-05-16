//require
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressLayouts = require('express-ejs-layouts');
const multer  = require('multer');


// Models and routes
const User = require('./models/user');
const Listing = require("./models/listing.js")
const Review = require("./models/review.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");



 

// MongoDB

const ATLASDBURL = process.env.MONGO_URI;
// Middlewares
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // FIXED: No space
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('layout', 'layout/boilerplate');



//session store

const store = MongoStore.create({ 
    mongoUrl:ATLASDBURL,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter : 24*3600,
   
 });

 store.on("error",()=>{
    console.log("err on mongo store", err)
 });
// Session and flash
app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, // FIXED: should be false for localhost
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash variables for all templates
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curruser = req.user;
    next();
});

// Routes
app.use("/listing", listings);
app.use("/listing/:id/review", reviews);
app.use("/", userRouter);



// Error handling
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listing/error.ejs", { err });
});

// Connect to MongoDB
async function main() {
    await mongoose.connect(ATLASDBURL);
    console.log("Connected to MongoDB");
}
main();



// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
