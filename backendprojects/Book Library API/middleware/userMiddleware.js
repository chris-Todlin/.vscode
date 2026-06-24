/* Place for the user middlware */

const passport = require("passport");
const { signIn } = require("../controller/userFunc");
const { User } = require("../model/userModel");

// sign out the user
// functionality - logout
function logUserOut(req,res,next){
    try {
        req.logOut(err=>{
            if(err) return next(err);

            // desry the session
            req.session(err=>{
                if(err) return next(err);

                res.clearCookie("connect.sid");
                res.redirect("/");
            });
        });
    } catch (error) {
        next(error); // thrwo an error
    }
}

// function to sign in the user 
async function signUser(req,res,next){
    try {
        // sign in the user
        await signIn(req,res,next, function(err,user){
            if(err) return next(err); // throw away the error

            // if there was ther user 
            if(!user){
                return res.json("User already exists!");
            }

            // if not then passport them 
            passport.authenticate("local",{
                successFlash: "Logged in",
                successRedirect: "/",
                failureFlash: "Incorrect username or password",
                failureRedirect: "/login"
            })(req,res,next);
        });
    } catch (error) {
        next(error); 
    }
}

// export the two functions
exports.signUser = signUser;
exports.logUserOut = logUserOut;