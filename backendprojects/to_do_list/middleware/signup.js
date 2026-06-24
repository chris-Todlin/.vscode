/* This is to handle the login details */

const passport = require("passport");
const User = require("../model/user");

// function to create and login the user
async function signUpUser(req,res,next){
    // the username and password from the 
    const {username,password} = req.body;
    try {
        // find the user first
        const user = await User.findOne({username: username});

        if(user){
            // the user is alread there
            req.flash("info", "The user already exists!");
            return res.redirect("/login");
        }

        // this means that the user is not there so create him annd login 
        await User.create({
            username: username,
            password: password
        })
        .then(()=>{
            passport.authenticate("login",{
                successFlash:"logged In",
                successRedirect: "/",
                failureFlash: "Incorrect username or password",
                failureRedirect: "/signup"
            })(req,res,next);
        })
    } catch (error) {
        next(error); // the crash error
    }
}

module.exports = signUpUser;