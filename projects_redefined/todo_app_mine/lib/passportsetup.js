/* 
    This is the function to setup the passport
        - We have the passport.deserialize
        - Passport serialize 
        - The passort strategy we are going to employ
*/

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/usermodel");

module.exports.passSetup = function(){
    // serialize the user
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    // now deserialize the user
    passport.deserializeUser(async function(id, done){
        try {
            const user = await User.user.findById(id);

            if(user) return done(null, user);
            return done(null,false); // no user with such id
        } catch (error) {
            done(error);
        }
    });

    // local strategy to use here in
    passport.use("login",new localStrategy(async function(username, password, done){
        try {
            const user = await User.user.findOne({username: username});

            if(!user) return done(null, false, {message: "No such username exists!"});

            user.comparePassword(password, function(err, isMatch){
                if(isMatch) return done(null, user);

                return done(null, false, {message: "Incorrect password"});
            });
        } catch (error) {
            done(error);
        }
    }));
}