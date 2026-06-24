/* 
    -> This middleware is used to signup the user.
    -> It is a standalone since it has a lot of thing for pitfalls
    -> Get the username and password and repass.
    -> Check if the user exists and authenticate 
    -> Create if no or else tell the user
*/

const passport = require("passport");
const User = require("../model/usermodel");

async function signup(req,res,next){
    // this content goes in here
    // get the form details
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username: username}); // find by username

        if(user){
            // the user is already there
            req.flash("info", "User already exist. Please login");
            return res.redirect("/login");
        }

        // else create then passport authenticate
        await User.create({
            username: username,
            password: password
        });

        // authenticate the user
        passport.authenticate("login",{
            successFlash: "Logged in",
            successRedirect: "/task/tasks",
            failureFlash: "Incorrect username or password",
            failureRedirect: "/login"
        })(req,res,next); // done now
        
    } catch (error) {
        next(error); // throw the error out
    }
}

// export the function
module.exports = signup;