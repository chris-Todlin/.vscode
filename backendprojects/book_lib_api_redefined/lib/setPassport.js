/* Setting the passport int he app.js */
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/user_model");

// set the bigger function 
module.exports = function(){
    // serialise the user
    passport.serializeUser(function(user,done){
        done(null, user._id); // return 
    });

    // deserialize the user
    passport.deserializeUser(async function(id, done){
        try {
            const user = await User.findById(id);

            if(user){
                done(null, user);
            } else {
                done(null, false);// there is no user, incase
            }
        } catch (error) {
            done(error); // erroneous
        }
    });

    // now our strategy, login
    passport.use("login", new localStrategy(async function(username, password, done){
        try {
            const user = await User.findOne({username: username});

            // check of the user is there
            if(!user){
                return done(null, false, {message: "User does not exist!"});
            }

            // else check 
            user.comparePassword(password,function(err, isMatch){
                if(err) return done(err);

                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Incorrect password!"});
                }
            });
        } catch (error) {
            done(error);
        }
    }))
}