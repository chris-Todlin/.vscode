/* This is the main appication interface to the server */
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const rfs = require("rotating-file-stream");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const setUpPassport = require("./lib/setuppassport");
const {isLoggedIn, notLoggedIn} = require("./middleware/auth");
const localVaraiables = require("./middleware/locals");
const defaultRouter = require("./routes/default");
const routerGame = require("./routes/game");

/* Now start the application, express versoin */
const app = express();

// Setting the database and making sure it is connected
mongoose.connect("mongodb://localhost:27017/numberGame")
        .then(()=>{
            console.log("Connected to database sucessfully!");
        })
        .catch(err=>{
            console.log("Error in conecting to the database!!");
            console.error(err);
        });

/* Configuration */
//port
app.set("port",process.env.PORT || 3000);

// the views
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// setting the morgan and fs
const acessStream = rfs.createStream("access.log",{
    compress: "gzip",
    path: path.resolve(__dirname, "./log"),
    interval: "1h"
});

// the morgan 
app.use(morgan("combined", {stream: acessStream}));
app.use(morgan("tiny"));

// For the session
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "This is a new game"
}));
// passport touches of rht e session and other thins
app.use(passport.initialize());
app.use(passport.session());
// function to serialise and deserialise the user and login strategy
setUpPassport(); // there you go
// for the message to the user
app.use(flash());

/* Section for the must route handle */
app.use(localVaraiables);

// setting up the express indidialities such as the static, json and urlencoded
app.use(express.static(path.resolve(__dirname, "./public")));
// for the form things
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/* Section for th eroutes to channel the request and reposnses */
app.use("/",defaultRouter); // the default functionality
app.use("/game",routerGame);

/* Error handlers for incse of 404 or the notorious 500 */
app.use((req,res,next)=>{
    res.status(404).render("404"); // The 404 ejs file 
});

app.use((err,req,res,next)=>{
    // print the error
    console.error(err.stack);
    // render the 500 ejs file for html
    res.status(500).render("500"); // The 404 ejs file 
});

/* The listen and all that , finish it or reall set it to listen */
const port = app.get("port");

app.listen(port,()=>{
    console.log(`Number Guessing game started at port: ${port}.\nhttp://localhost:${port}`);
});