/* This is the router for the login and the signuo plus the log out */
const express = require("express");
const signUpUser = require("../middleware/signup");
const passport = require("passport");

const router = express.Router();

// for the signup part
router.get("/signup", (req,res)=> res.render("signup"));

// post request for the sigup
router.post("/signup",signUpUser);

// for the signup form
router.get("/login", (req,res)=> res.render("login"));

// for the signup 
router.post("/login",passport.authenticate("login",{
    uccessFlash:"logged In",
    successRedirect: "/",
    failureFlash: "Incorrect username or password",
    failureRedirect: "/login"
}));

// the path to log out the user incase of anything
router.get("/logout",(req,res,next)=>{
    // insert the cb after the log out
    try {
        // Now log out the user
        req.logout(err=>{
            // incase of error
            if(err) {return next(err);}

            // now destroy the session
            req.session(err=>{
                if(err) console.error(err);

                res.clearCookie("connect.sid");
                res.redirect("/");
            })
        })
    } catch (error) {
        next(err); // pass the error out for debugging
    }
})

// module export the router
module.exports = router;