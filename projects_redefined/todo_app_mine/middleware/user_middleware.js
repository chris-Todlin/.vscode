/* 
    This function should handle middleware of the user interfacing
    It purpose it to create the abstaraction and faster correction incase of error.
*/

const User = require("../model/usermodel"); // the user model 
const passport = require("passport");

// function to sin in the user from the db
module.exports.signIn = async function(req,res,next){
    try {
        const {username, password} = req.body;

        // assuming the userr input is fine for now
        const user = await User.user.findOne({username: username});

        if(user) return res.json({message: "User already exists!"});

        // now create the user
        await User.user.create({username: username, password: password}); // create the user

        await passport.authenticate("login",{
            failureFlash: "Incorrect password or username",
            failureRedirect: "/login",
            successFlash: "Logged in",
            successRedirect: "/task"
        })(req,res,next);
    } catch (error) {
        next(error);
    }
}

// function to login the user
module.exports.logIn = function(req,res,next){
    try {
        passport.authenticate("login",{
            failureFlash: "Incorrect password or username",
            failureRedirect: "/login",
            successFlash: "Logged in",
            successRedirect: "/task"
        })(req,res,next);
    } catch (error) {
        next(error);
    }
}

// funciton to logout the user
module.exports.logoutUser = function(req,res,next){
    try {
        req.logOut(err =>{
            if(err) next(err);

            // now clear the session
            req.session.destroy(err=>{
                if(err) console.error(err);

                res.clearCookie("connect.sid");
                res.redirect("/");
            });
        });
    } catch (error) {
        next(error);
    }
}