/* This is the main file of the server */
const express = require("express");
const { default: helmet } = require("helmet");
const dotenv = require("dotenv").config({path: "./appenv.env"});
const mongoose = require("mongoose");
const path = require("path");
const compression = require("compression");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const setPassport = require("./lib/setPassport");
const flash = require("connect-flash");
const userRouter = require("./routes/route_user");

/* db and app */
// create the express application 
const app = express();

// set the mongodb mongoose 
mongoose.connect("mongodb://localhost:27017/book_redefined")
        .then(()=>{
            console.log("database Book Library [connected]");
        })
        .catch(err=>{
            console.error(err.stack);
        });

/* configuration */
// database is now in 

// the setting of the application 

// start with the env
app.set("env",process.env.NODE_ENV);

// set the port 
app.set("port",process.env.PORT || 3000);

// set the views of the application 
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "./views"));

/* Middleware */
app.use(compression({threshold: 0}));
app.use(helmet()); // set my security well

// now the on on the loggin
const accessStream = rfs.createStream("access.log",{
    interval: "1d",
    compress: "gzip",
    path: path.resolve(__dirname, "log")
}); // done with this one

// now set the logger to recieve the router and recorde them 
app.use(morgan("combined", {stream: accessStream})); // for the file 
app.use(morgan("dev"));

// now set the cookie parser
app.use(cookieParser());
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: "slmgnkwjthobiguwepgtwoijfwpehro"
})); // done with the cookies

// set the passport shit
app.use(passport.initialize());
app.use(passport.session()); 
// pending ... (setting the passport)
setPassport(); 

// now statis and anything 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use(flash());

/* For the form */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// now the one to initalte the locasl with the res.locals of the user anme
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.infos = req.flash("info"); // the info flash messages
    // continue
    next();
});

/* Routes */
// get the routes weell
app.use(/* User Router */userRouter);

/* Default path */
app.get("/",(req,res)=>{
    res.render("main");
});

/* Error handlers */
// the custom error - replace with the ejs files

app.use((req,res,next)=>{
    res.status(404).send("404 - Resource Not Found");
});

app.use((req,res,next)=>{
    res.status(500).send("500 - Internal server Error");
});

/* Listem and run */
const port = app.get("port");

app.listen(port,()=>{
    console.log(`App started at port: ${port}.More at http://localhost:${port}.\nGet on board ...`);
});