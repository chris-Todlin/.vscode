/* This is for the router */
/* This is the middleware that create updates read and delete the task */

// create the router 
const express = require("express");
const { signUser, logUserOut } = require("../middleware/userMiddleware");
const passport = require("passport");
const { notAuth, Auth } = require("../middleware/auth");

// create the router 
const router = express.Router();

// sign in the user 
router.
    route("/signin",notAuth )
    .get((req,res)=>res.render("signin")) // signin ejs
    .post(signUser); // sing in the user

// login the user
router.
    route("/login",notAuth)
    .get((req,res)=>res.render("signin")) // login ejs
    .post(passport.authenticate("local",{
            successFlash: "Logged in",
            successRedirect: "/",
            failureFlash: "Incorrect username or password",
            failureRedirect: "/login"
        })); // login in the user

// log out th euser 
router.get("/logout",Auth, logUserOut); // done

// export the router out
exports.router = router;