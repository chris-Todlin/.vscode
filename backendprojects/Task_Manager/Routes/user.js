/* 
    This router is for the user functionlaity, 
        - Renders the login page
        - Renders the lsignup page
        - Signsup the user
        - Logs in the user
        - Log's out the user
*/

/* Modules neeeded */
// import the express module
const express = require("express"); // the framework
const passport = require("passport");
const signup = require("../middleware/signup");
const { isAuthent, notAuthenticated } = require("../middleware/ensureAuth");

// Create the router for the application
const router = express.Router();

/* Route handlers for the diffrent works */

// render signup page
router.get("/signup",notAuthenticated,(req,res)=> res.render("signup")); // only this

// sigup the user
router.post("/signup",notAuthenticated,signup); // now it is good

// render the login page to the user
router.get("/login",notAuthenticated,(req,res)=> res.render("login")); // only this

// login the user
router.post("/login",notAuthenticated,passport.authenticate("login",{
    successFlash: "Logged In",
    successRedirect: "/task/tasks",
    failureFlash: "Incorrect Username or Password",
    failureRedirect: "/login"
}));

// log out the user
router.get("/logout",isAuthent,(req,res,next)=>{
    // logout with cb
    req.logOut(err=>{
        if(err) {next(err);} // if there was an error get it out

        // else destroy the session of the user
        req.session.destroy(err=>{
            if(err) {console.error(err); } // Print out the error for the user to see

            // else clear the cookie and redirect
            res.clearCookie("connect.sid");
            res.redirect("/"); // back to the landing page
        });
    });
});

// export the router out
module.exports = router;