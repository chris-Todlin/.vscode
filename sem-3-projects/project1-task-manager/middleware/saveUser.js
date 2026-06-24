/* This function is going to save the user and set him right into the matrix meeded */
// get the user in
const User = require("../model/userModel"),
passport = require("passport");

module.exports = async function(req,res, next){
    try{
        const data = req.body;
        const user = await User.findOne({username: data.username});

        if(user){
            return res.json("User already exists");
        }

        // else create the user
        await User.create({
            username: data.username, 
            password: data.password,
            bio: ''
        });

        console.log('User Created!');

        // sig in the user now
        await passport.authenticate('login',{
            failureMessage: "Incorrect password or username",
            failureRedirect: "/user/login",
            successMessage: "Logged In",
            successRedirect: "/"
        })(req,res,next);
    }
    catch(e){
        next(e); // the error internal way
    }
}