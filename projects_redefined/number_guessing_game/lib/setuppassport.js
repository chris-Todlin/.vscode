/* Serialize and deserialize the user */
const passport = require("passport");
const User = require("../model/user");
const localStrategy = require("passport-local").Strategy;

/* function to serialize and deserialize the user */
module.exports = function(){
    passport.serializeUser(function(user,done){
        done(null, user._id);
    });

    /* Now deserialize the user */
    passport.deserializeUser(async function(id,done){
        try {
            const user = await User.findById(id);

            if(!user) return done(null, false);

            done(null, user); // return him here
        } catch (error) {
            done(error);
        }
    });

    /* Login strtagey to signup the ser */
    passport.use("login", new localStrategy(async function(username, password,done){
        try {
            const user = await User.findOne({username: username});

            if(!user){
                return done(null, false, {message: "No such username exists!"});
            }

            // if the user is there
            user.checkPassword(password,function(err,isMatch){
                if(err) return done(err);

                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Invalid Password"});
                }
            });

        } catch (error) {
            done(error);
        }
    }));
};