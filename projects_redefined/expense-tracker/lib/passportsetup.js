const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const UserModel = require("../model/userModel");


module.exports = function(){
    passport.serializeUser(function(user,done){
        done(null, user._id);
    });

    passport.deserializeUser(async function(id,done){
        try {
            const user = await UserModel.findById(id);

            if(!user) return done(null,false);

            done(null,user);
        } catch (error) {
            done(error);
        }
    });

    // Login stategy
    passport.use("login", new localStrategy(async function(username,password,done){
        try {
            const user = await UserModel.findOne({username:username});

            if(!user) {
                return done(null, false, {message: "No such username exists!"})
            }

            user.checkPassword(password,function(err,isMatch){
                if(err) return done(err);

                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Invalid password!"});
                }
            })
        } catch (error) {
            done(err);
        }
    }));
};