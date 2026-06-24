/* This is the main entry to our dear To Do List Application */

// Importing the modules in 
const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//const fileStore = require("session-file-store");
const taskRoute = require("./routes/task");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const setPassport =  require("./lib/setPassport");
const initializeSession = require("./middleware/setSession");
const userRoute = require("./routes/user");

// start the application
const app = express();

// connect to the mogodb
mongoose.connect("mongodb://localhost:27017/TODO")
        .then(()=>{
            console.log("Connected to mongodb - TODO");
        })
        .catch(err=>{
            console.log(err);
            console.log("Errors in connectiong to mongodb");
        });

// Set the port of the application
app.set("port", process.env.PORT || 3000);

// setting the views of the application
app.set("view engine","ejs");
app.set("views", path.resolve(__dirname, "./views"));

// setting the logging functionalilty
const accessStream =  rfs.createStream("access.log",{
    compress: "gzip",
    interval: "1h",
    path: path.resolve(__dirname, "./log") // Place to store the files of the log
});
app.use(morgan("combined",{stream: accessStream}));
app.use(morgan("tiny"));

// Setting up the session storage though I would migrate to the mongo session
//const sessionStore = fileStore(session);
app.use(cookieParser());
app.use(session({
    /* store: new sessionStore({
        path: path.resolve(__dirname, "./session"),
    }), */
    secret: "jsnfjnskdjfbssdfjnkjfd12121",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // The message to include
setPassport(); // The passport strategy and session

// the static bootstrap 
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json()); // For the form use
app.use(express.urlencoded({extended: false}));

app.use(initializeSession); // for the session and flash messages

// The routers
app.use(taskRoute);
app.use(userRoute);

/* The famous route handler */
app.use((req,res,next)=>{
    // 404 handler
    res.type("html").status(404).send("404 -  Resource Not Found!");
});

// the 500 internal server error -  print the error incase of anything we forgot
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("500 - Internal Server Error");
});

// Start and listen to the application
const port = app.get("port");
app.listen(port,()=>{
    console.log(`Trial To Do List Application started on port:${port}.
        \nhttp://localhost:${port}`);
});