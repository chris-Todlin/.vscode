/* This is use to inititialize the session of the user for the user in the passport session */
const passport = require("passport");
const User = require("../model/user");
const localStrategy = require("passport-local").Strategy;

// now the main functionto export
module.exports = function(){

    // the function to serialize the user
    passport.serializeUser(function(user,done){
        done(null, user._id);
    });

    // function to deserialize the user
    passport.deserializeUser(async function(id,done) {
        try {
            const user = await User.findById(id);

            if(user){
                return done(null, user)
            } else {
                return done(null,false); // return the error
            }
        } catch (error) {
            done(error);
        }
    });

    // function to local strategy
    passport.use("login", new localStrategy(async function(username,password,done){
        try {
            // find the user 
            const user = await User.findOne({username: username});

            if(!user) {
                return done(null, false, {message: "No such username exists"});
            }

            // now compare the password
            user.comparePassword(password, function(err, isMatch){
                if(err) return done(err);

                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Incorrect password"});
                }
            });
        } catch (error) {
            done(err);
        }
    }))
}