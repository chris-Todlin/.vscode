const passport = require("passport");
const User = require("../model/usermodel");
const localStrategy = require("passport-local").Strategy;

module.exports = function(){
    passport.serializeUser(function(user,done){
        done(null,user._id);
    });

    passport.deserializeUser(async function(id,done){
        try {
            const user = await User.findById(id);

            if(!user) return done(null,false);

            // else
                done(null, user);
        } catch (error) {
            done(error); // incase of error
        }
    });

    passport.use("login", new localStrategy(async function(username,password,done){
        try {
            const user = await User.findOne({username: username});

            if(!user) {
                return done(null, false,{message: "No user has that username!"});
            }

            user.checkPassword(password, function(err,isMatch){
                if(err) { return done(err);}

                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Invalid password!"});
                }
            })
        } catch (error) {
            done(error);
        }
    }))
};