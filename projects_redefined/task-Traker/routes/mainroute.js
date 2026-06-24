/* It is going to have the login, laning page and other in there */
const express = require("express");
const User = require("../model/usermodel");
const passport = require("passport");

// The router application
const router = express.Router();

// The main page
router.get("/",(req,res)=>{
    res.render("landingpage");
});

// A sign up route handler
router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.post("/signup",async(req,res,next)=>{
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username: username});

        if(user) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }

        // If not a user
        const newUser = new User({
            username: username,
            password: password
        });

        newUser.save().
            then(()=>{
                passport.authenticate("login",{
                    successFlash: "Sucessfully signed in",
                    successRedirect: "/taskapp/",
                    failureRedirect: "/signup",
                    failureFlash: "Incorrect password or username"
                })(req,res,next);
            });
    } catch (error) {
        next(error); 
    }
});

router.get("/login",(req,res)=>{
    res.render("login");
});

// login the user
router.post("/login",passport.authenticate("login",{
    successFlash: "Sucessfully signed in",
    successRedirect: "/taskapp/",
    failureRedirect: "/login",
    failureFlash: "Incorrect password or username"
}));

router.get("/logout",(req,res)=>{
    req.logout(err => {
        if(err) {return next(err); }

        req.session.destroy(err =>{
            if(err) console.error(err);

            res.clearCookie('connect.sid');
            res.redirect("/");
        });
    });
});
module.exports = router;