//require

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const { saveRedirecturl, isLoggedIn } = require("../middleware");
const userController = require("../controllers/user");


//Signup router


router.route("/signup")
.get( userController.userSignups)

.post( wrapAsync(userController.userSignup))



//login router

router.route("/login")
.get( userController.userLogins)


.post(saveRedirecturl,passport.authenticate('local', 
    { failureRedirect: '/login',failureFlash:true}),userController.userLogin);

//logout route

router.get("/logout",userController.userLogout);



//exports

module.exports = router;