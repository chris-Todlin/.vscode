/* 
    - This function is just as it is 
    - Not much to tell you, kiddo
*/

/* Modules needed */
const passport = require("passport");
const User = require("../model/usermodel");
const localStrategy = require("passport-local").Strategy;

/* Functioon to do the whole work */
function setSession(){

    // serialize the user
    passport.serializeUser(function(user,done){
        done(null,user._id);
    });

    // deserialize the user
    passport.deserializeUser(async function(id,done){
        try {
            const user = await User.findById(id);

            if(!user){
                done(null,false);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error); // throw the error
        }
    });

    // the login strategy 
    passport.use("login", new localStrategy(async function(username,password,done){
        try {
            const user = await User.findOne({username: username});

            // if the user is there
            if(!user){
                return done(null, false, {message: "User does not exist"});
            }

            // else compare the passwords
            user.CheckPassword(password,function(err,isMatch){
                if(err) return done(err);

                if(isMatch){
                    return done(null,user);
                } else {
                    return done(null,false,{message: "Incorrect password"});
                }
            });
        } catch (error) {
            done(error); // for the error thrower
        }
    }))
}

/* Export */
module.exports = setSession; // done exporting