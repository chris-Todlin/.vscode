/* This is the default path to be used by the route handler */
const express = require("express");

// function to ensure the user is not authenticated for you to sign or login
const { isLoggedIn,notLoggedIn } = require("../middleware/auth");
const User = require("../model/user");
const passport = require("passport");

// Create the router for the path 
const router = express.Router();

// the first path is the home or the landing page of the window
router.get("/",(req,res)=>{
    // render the home ejs
    res.render("home");
});

//T The user clicks the event on the sigup 
router.get("/signup",notLoggedIn,(req,res)=>{
    res.render("signup"); // Sign up form
});

// For the login guy to do son, send the form now
router.get("/login",notLoggedIn,(req,res)=>{
    res.render("login"); // Login form
});

// now the function to add the user
router.post("/signup",notLoggedIn,async(req,res,next)=>{
    const {username, password} = req.body; // the ones we are expecting
    console.log("I am here in the signup palace");
    
    // function or the sing up functionality
    try {
        const user = await User.findOne({username:username});

        console.log("I am on the user phase");

        // if the user exists then return a message
        if(user) {
            console.log("I am on the user phase, user is there");
            /* req.flash("info","User already exists!"); */
            return res.json({message: "User already exists!"});
        }

        // if not, then create one then local stragey sign him in
        const newUser = new User({
            username: username,
            password: password
        });
        console.log("I am going to save you");
        newUser.save()
                .then(()=>{
                    console.log("i am going to authenticate you!");
                    passport.authenticate("login",{
                    successFlash: "Signed In",
                    failureFlash: "Invalid username or password",
                    successRedirect: "/",
                    failureRedirect: "/signup"
                })(req,res,next);
        });
    } catch (error) {
        next(err); // error occured
    }
});

// a login one now
router.post("/login",passport.authenticate("login",{
    successFlash: "Signed In",
    failureFlash: "Invalid username or password",
    successRedirect: "/",
    failureRedirect: "/signup"
}));

// Export the router
module.exports = router;