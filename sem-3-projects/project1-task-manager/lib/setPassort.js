/* 
    Setting up the passport to sign in and get to know the current user
*/

const passport = require("passport"),
localStrategy = require("passport-local").Strategy,
User = require("../model/userModel");

module.exports.passportSetUp = function(){
    // serialize the user
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    // deserialize the user
    passport.deserializeUser(async function(id, done){
        try {
            const user = await User.findById(id);

            if(user) return done(null, user);
            return done(null, false); // no user
        } catch(e){
            done(e);
        }
    });

    // the local stategy 
    passport.use("login", new localStrategy(async function(username, password, done){
        try {
            const user = await User.findOne({username: username});

            if(!user) return done(null, false, {message: "No such username exists!"});

            user.checkPassword(password, function(err,isMatch){
                if(isMatch) return done(null, user);

                return done(null, false, {message: "Incorrect password"});
            });
        } catch(e){
            done(e);
        }
    }));
}