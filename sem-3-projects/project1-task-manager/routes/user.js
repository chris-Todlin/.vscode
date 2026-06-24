/* 
    This is the routes for the user in all the acti ities required to be used by the user
    -> login
    > Sign up
    ->  dashboard
*/

const userRouter = require("express").Router();
const signUpUser = require("../middleware/saveUser");

// Set the path for the login page retrieval and getting it
userRouter.route("/signup")
        .get((req,res,next)=>{res.render("signup")})
        .post(signUpUser);

userRouter.post("/login",(req,res,next)=>{
    res.send("Okay!");
})

module.exports = userRouter;