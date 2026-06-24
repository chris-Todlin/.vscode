/* 
    -> This is the main server appplication js file
*/

// the main express framework
const express = require("express");
const morgan = require("morgan"); // for logging
const rfs = require("rotating-file-stream"); // save the logs
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const setSession = require("./controller/session");
const userRouter = require("./Routes/user");
const taskRouter = require("./Routes/task");


/* The appllication under express */
const app = express();

/* Start also the db */
mongoose.connect("mongodb://localhost:27017/TASK_MANAGER")
        .then(()=>{
            console.log("MongoDB [TASK MANAGER] connected.\nReady for operation\n\nROUTES");
        })
        .catch(err=>{
            console.log("Troubles in connecting to the database")
            console.error(err);
        });

/* Setting the port of the application or server */
app.set("port", process.env.PORT || 3000);

// Set the views -ejs
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views")); // the folder with the views

/* MIDDLEWARE */
// adding and saving the logs in a file
const acessStream = rfs.createStream("access.log",{
    interval: "1h",
    compress: "gzip",
    path: path.resolve(__dirname, "./log") // creates is none
});
app.use(morgan("combined",{stream:acessStream}));
// setting the one on the logging of the request and the response
app.use(morgan("short"));
// for the session
app.use(cookieParser());
app.use(session({
    secret: "ewferuhfwuehrfwiu3343n",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session());
setSession(); // for the counter parts

// the flash messages
app.use(flash());

// set the bootstrap out there for inport via cs or js
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended: false}));

// populater the infos and current User
app.use((req,res,next)=>{
    res.locals.infos = req.flash("info") || [];
    res.locals.currentUser = req.user;
    res.locals.show = false;

    next()
});

// the router user
app.use(userRouter);
app.use("/task",taskRouter); // trial phase

/* Router handler for the landing page */
app.get("/",(req,res)=> res.render("landing")); // for now it is a trial case use

/* Error route handlers */

// the 404 one
app.use((req,res,next)=>{
    res.status(404).render("404"); // the ejs on 404
});

// the 500 one
app.use((err,req,res,next)=>{
    console.error(err.stack); // output the error
    res.status(500).render("500"); // the ejs on 500
});


/* The listening section */
//get the port first
const port = app.get("port");
app.listen(port,()=>{
    console.log(`Task Manager Application started at port ${port},
        \nURL: http://localhost:${port}`);
});