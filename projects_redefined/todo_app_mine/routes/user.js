/* 
    This is the file containing the path to all user activities. 
    It abstract the route handler and con=mmunicates with the database. 
    There such as: 
        login 
        logout
        signin
        rendering the page for the login and log out
*/

const express = require("express");
const functUser = require("../middleware/user_middleware");
const authUser = require("../middleware/auth");

// create the router there in
const router = express.Router();

// the part of the sign in to the application 
router.route("/signin", authUser.loggedOut)
    .get((req,res)=> res.render("signin"))
    .post(functUser.signIn); // function to handle that

router.route("/login",authUser.loggedOut)
    .get((req,res)=> res.render("login"))
    .post(functUser.logIn); // function to handle that

router.get("/logout",functUser.logoutUser);
// export the orouter 
module.exports.router = router;