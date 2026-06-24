/* 
    This is the main fiel of the application
    It contains the main entry to the server an all of that.
    I reconnend you look into the variable name for more understanding
*/

const express = require("express");
const helmet = require("helmet");
const path  = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const cookeParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const setPass = require("./lib/passportsetup");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const db = require("./data/startbd");

// the application 
const app = express();

// connect the db 
db.startDB();

// set the port
app.set("port", 3000);
app.set("env", "development");
app.disable("x-powered-by");
app.use(helmet());  

// sett he view of the application
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// set the morgan one
app.use(morgan("short"));

// set up the cooke and the session of the user
app.use(cookeParser('5116d12b-dc67-44bf-8c6c-4d51551dc183'));
app.use(session({
    resave: true, 
    saveUninitialized: false, 
    secret: '58ba45db-1a49-4fc4-a030-bdf6fa3c5665'
}));
app.use(passport.initialize());
app.use(passport.session());
setPass.passSetup();
app.use(flash());

// the one of the forms
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// NOW SET THE middleware to be used there in 
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.resolve(__dirname, "public")));

// middleware to include the locals of the 
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.infos = req.flash("info");
    res.locals.errors = req.flash("error");
    next();
});

// the routers of the application 
app.use("/",userRouter.router);
app.use("/task",taskRouter.router);

// now the route handlers
app.get("/",(req,res)=>{
    res.render("home");
});

/* The 404 and the 500 handler */
app.use((req,res,next)=>{
    res.status(404).render("404");
});

app.use((err,req,res,next)=>{
    console.error(err.stack); // print out the error
    res.status(500).render("500");
});

// Now the listen and start 
app.listen(3000,()=>{
    console.log("App started at port 3000.more at http://localhost:3000");
});