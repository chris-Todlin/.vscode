/* This is to signup the user */
const User = require("../model/user");

// function to do so
async function signUpUser(req,res,next){
    const {username,password} = req.body;

    try {
        const user = await User.findOne({username: username});

        if(user) {
            return res.status(400).json({message: "User alreadyy exists"});
        }
    } catch (error) {
        next(error);
    }
}