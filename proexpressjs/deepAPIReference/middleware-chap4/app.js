/* Middleware working with */

/* MODULES */
const express = require("express");
const { myMiddleware, logReq } = require("./middlware/mMiddleware");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csurf = require("csurf");
const errorHandler = require("errorhandler");
const timeout = require("connect-timeout");

/* APP AND DB */
const app = express(); // the instance of the express application
const dotenv = require("dotenv").config({path: "./server.env"});

/* CONFIGURATION */
app.set("env", process.env.NODE_ENV);
app.set("port", process.env.PORT);
app.enable("trust proxy");
app.disable("x-powered-by");

// setting the ejs files 
app.set("view engine",'ejs');
app.set("views",path.join(__dirname, "./views"));

/* MIDDLEWARE */
app.use(myMiddleware);
//app.use(logReq); // replace with the morgan on
app.use(compression({threshold: 1}));
app.use(morgan("dev"));
app.use(express.json()); // no much setting 
app.use(express.urlencoded({extended: true})); // no much setting 
app.use(cookieParser());
app.use(session({
  secret: "This is a secret message",
  resave: true, 
  saveUninitialized: true
}));

// if it is in develop ment 
if( app.get("env" === "development")){
  ap
}
app.use(csurf());
app.use(express.static(path.join(__dirname, "./public"))); // for the static files in the public folder

/* ROUTES */
app.get("/",timeout('1s'),(req,res)=> res.render("index"));

/* ERROR HANDLER ROUTES */

/* START AND LISTEN */
const port = app.get("port");
app.listen(port,()=>{
  console.log("App started on port: %s.To see more, go to http://localhost:%s",port,port);
});