const express = require("express");
const UserModel = require("../model/userModel");
const passport = require("passport");
const {ensureIsOut, ensureAuthenticated} = require("../middleware/authenticate");

const router = express.Router();

// Handle the main landing page for the express tracker aplication
router.get("/",(req,res)=>{
    res.render("home");
});

// A signup form routes
router.get("/signup", ensureIsOut,(req,res)=>{
    res.render("signup");
});

// now sign up the user and get him in
router.post("/signup",ensureIsOut,async function(req,res,next) {
    const {username, password} = req.body;

    // find the user
    try {
        const user = await UserModel.findOne({username: username});

        if(user){
            req.flash("info","User already exists!");
            return res.redirect("/signup");
        }

        const newUser = new UserModel({
            username: username,
            password: password
        });

        newUser.save()
                .then(()=>{
                    passport.authenticate("login", {
                        successFlash: "Signed In",
                        successRedirect: "/expense/",
                        failureRedirect: "/signup",
                        failureFlash: "Incorrect password or Username!!"
                    })(req,res,next);
                });
    } catch (error) {
        req.flash("info", "Error in signing you in!!");
        next(err);
    }
});

router.get("/login", ensureIsOut,(req,res)=>{
    res.render("login");
});

router.post("/login",ensureIsOut,passport.authenticate("login", {
    successFlash: "Signed In",
    successRedirect: "/expense/",
    failureRedirect: "/signup",
    failureFlash: "Incorrect password or Username!!"
}));

router.get("/logout",ensureAuthenticated,(req,res,next)=>{
    req.logOut(err=>{
        if(err) {
            return next(err);
        }

        req.session.destroy(err=>{
            if(err) return next(err);

            res.clearCookie("connect.sid");
            res.redirect("/");
        });
    });
});

module.exports = router;