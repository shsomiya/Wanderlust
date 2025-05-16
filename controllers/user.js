
const User = require("../models/user.js");


//Singup
module.exports.userSignups =(req, res) => {
    res.render("users/form.ejs");
};

module.exports.userSignup = async(req, res,next) => {

    try{
        let{ username,email,password} = req.body;
        let newUser = new User ({email,username});
        let registerUser = await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success", " Signup successful! Welcome to Wanderlust!");
            res.redirect('/listing');
        })
        
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }
    

    
};

//login

module.exports.userLogins = (req, res) => {
    res.render("users/login.ejs");

};
module.exports.userLogin = async(req, res) =>{
    req.flash("success","Welcome to Wonderlust!");
    let redirecturl = res.locals.redirecturl ||"/listing";
    res.redirect(redirecturl);
    };

//logout

module.exports.userLogout = (req,res,next)=>{
    req.logout((err)=>{
       if(err){
            return next(err)
         }
         req.flash("success","Welcome to Wonderlust!")
         res.redirect("/listing")
    })
};