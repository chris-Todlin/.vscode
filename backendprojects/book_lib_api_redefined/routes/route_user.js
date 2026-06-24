/* This is the route used by the user */
const express = require("express");
const { logUserOut, logIn, signIn } = require("../middleware/user_middleware");

// create the router
const Router = express.Router();

/* Router handler */

// path to send the signup on /signup
Router.route("/signup")
    .get((req,res)=>{res.render("signin")})
    .post(/* handler there */signIn);

// path to send the signup on /signup
Router.route("/login")
    .get((req,res)=>{res.render("login")})
    .post(/* handler ther in */logIn)

Router.get("logout",/* Handler there in */logUserOut);
// export the router out 
module.exports = Router;