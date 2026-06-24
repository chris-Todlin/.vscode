/* Configuration, settigs and Environmentss */

/* MODULES */
const express = require("express");
const dotenv = require("dotenv").config({path: "./app.env"});
const path = require("path");
const cors = require("cors");

// create the app 
const app = express();

/* CONFIGURATION */
app.set("appName","HackHall"); // name of the application or websites
app.set("env",process.env.NODE_ENV); // the environment we are in
app.set("port",process.env.PORT || 3000); // if not defined then, this one

// set the view engine
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "./views"));

// jsonp callback 
app.set("jsonp callback name", "cb");

// set th etrust proxy o
app.enable("trust proxy");
app.disable("x-powered-by");

// set the name of the 
app.locals.appName = app.get("appName");

/* SETTNGS */
app.use(cors()); // for many crosss origin

/* ROUTE HANDLERS */
app.get("/",(req,res)=>res.render("home"));

// listen and start
const port = app.get("port");
app.listen(port,()=>{
  console.log("You're server is running on port:%s.To view it, open http://localhost:%s",port,port);
});