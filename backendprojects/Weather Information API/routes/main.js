/* This is the main router */
const express = require("express");

// create the router
const mainRouter = express.Router();

// redner the view
mainRouter.get("/",(req,res)=> res.render("view"));

module.exports = mainRouter;