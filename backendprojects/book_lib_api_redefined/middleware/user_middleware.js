/* In deen user middleware */

const User = require("../model/user_model");
const passport = require("passport");

// function to sign up the user 
async function signIn(req,res,next){
    try {
        // get the for data first
        const {username, password} = req.body;

        // find if the user is already there
        const user = await User.findOne({username: username}); // find by username

        // if the user is allready there
        if(user){
            req.flash("info","User already exists"); // the info message
            return res.redirect("/signup");
        }

        // else ass the user then passport auth 
        await User.create({
            username: username, 
            password: password
        }); // create the user 

        // now auth 
        passport.authenticate("login",{
            successFlash: "Logged in",
            successRedirect: "/",
            failureFlash: "Incorrect username or password",
            failureRedirect: "/login"
        })(req,res,next);
    } catch (error) {
        next(error); // throw out the error
    }
}

// function to login the user 
function logIn(req,res,next){
    // now auth 
    passport.authenticate("login",{
        successFlash: "Logged in",
        successRedirect: "/",
        failureFlash: "Incorrect username or password",
        failureRedirect: "/login"
    })(req,res,next);
}

// function to log out 
function logUserOut(req,res,next){
    req.logOut((err)=>{
        if(err) return next(err);

        // else 
        req.session.destroy((err)=>{
            if(err) return next(err);

            // else clear the ccookie 
            res.clearCookie("connect.sid");
            res.redirect("/");
        });
    });
}

/* export them out  */
module.exports.logIn = logIn;
module.exports.signIn = signIn;
module.exports.logUserOut = logUserOut;