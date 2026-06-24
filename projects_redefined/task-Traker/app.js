/* 
        LOG
    1. Setting up the express application
       -> Setting the main application
       -> Setting the view paths
       -> The 404 and 500 remaining styling with css or bootstrap
*/

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
const mongoose = require("mongoose");
const routeTask = require("./routes/taskroute");
const flash = require("connect-flash");
const mainroute = require("./routes/mainroute");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const setUpPassport = require("./lib/passportstrategy");

// Start the application
const app = express();

// Start the mongoose db fro the mogoDB
mongoose.connect("mongodb://localhost:27017/task-tracker")
        .then(()=>{
            console.log("Database connnected!");
        })
        .catch(err=> console.error(err));

// App configurations
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname,"./views"));

// Variables
const acessStream = rfs.createStream("acess.log",{
    path: path.resolve(__dirname, "./log"), // create if no 
    compress: "gzip",
    interval: "1d"
});

// Middleware
app.use(morgan("combined",{stream: acessStream})); // For the log files
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(session({
    secret: "This is a secret key",
    saveUninitialized: true, 
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
setUpPassport(); // for the strategy and session

// connect flash for the infos and errors
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error") || [];
    res.locals.infos = req.flash("info") || [];
    // Continue
    next();
});
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(mainroute);
app.use("/taskapp",routeTask);

// the handler for the 404 nd 500
app.use((req,res,next)=>{
    res.status(404).render("404");
});

app.use((err,req,res,next)=>{
    console.error(err.stack); // output the error to the console
    res.status(500).render("500");
});

// listening
const port = app.get("port");
app.listen(port,()=>{
    console.log(`Task Tracker started on port: ${port}.\nhttp://localhost:${port}`);
});