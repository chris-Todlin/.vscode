/* Functionality of the user */

const passport = require("passport");
const { User} = require("../model/userModel");

// sugn up the user 
async function signIn(req,res,next,cb){
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username}); // filter by username

        if(user){
            return cb(null, false); // the user exists
        }

        // else continue to the next creation stat
        return cb(null, await User.create({
            username: username,
            password: password
        }));
    } catch (error) {
        return cb(error);
    }
}

exports.signIn = signIn;