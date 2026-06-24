/* This is for the passport functioning */
const {Strategy, ExtractJwt} = require("passport-jwt");
const passport = require("passport");
const User = require("../model/user");
const path = require("path");
const dotenv = require("dotenv").config({path: require("path").resolve(__dirname, "../enviroment.env")});

// set the options
const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

// the stategy to use
passport.use(new Strategy(opt, async (paload,done)=>{
    try {
        const user = await User.findById(paload.id);

        if(user){
            done(null,user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}))