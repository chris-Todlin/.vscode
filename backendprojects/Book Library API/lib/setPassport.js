/* Function to set up the passport */

const passport = require("passport");
const { User } = require("../model/userModel");
const localStrategy = require("passport-local").Strategy;

module.exports =function(){
    // deserrialse the user 
    passport.deserializeUser(async function(id,done){
        try {
            const user = await User.findById(id);

            if(user){
                return done(null, user);
            } else {
                return done(null, false); // no user
            }
        } catch (error) {
            done(error);
        }
    });

    // eralize the user 
    passport.serializeUser(function(user,done){
        done(null, user._id);
    });

    // create the local statgert
    passport.use("local", new localStrategy(async function(username,password, done){
        try {
            const user = await User.findOne({username: username});

            if(!user){
                return done(null, false, {message: "No such user exists"});
            }

            user.comparePassword(password, function(err,isMatch){
                if(err) return done(err);

                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Incorrect password"});
                }
            });
        } catch (error) {
            done(error);
        }
    }));
}