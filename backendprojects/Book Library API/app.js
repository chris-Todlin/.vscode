/* Main app file - app.js */

/* modules */
const express = require("express"); // the main framework 
const dotenv = require("dotenv").config({path: "./environment.env"}); // pump the port and environmnet in
const path = require("path");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const compression = require("compression");
const serverFavicon = require("serve-favicon");
const helmet = require("helmet");
const bookRouter = require("./routes/book");
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const setPassport = require("./lib/setPassport");
const flash = require("connect-flash");

// start the app or db 
const app = express(); 

// start the mongodb 
mongoose.connect("mongodb://localhost:27017/book_api")
        .then(()=>{
            console.log("Book Library API DB [connected]");
        })
        .catch(err=>{
            console.log("Book Library API DB [unable to connected]");
            console.error(err.stack);
        });

/* Configuration of some variables here */

// the envirronment 
app.set("env", process.env.NODE_ENV); // development for now

// set the views 
app.set("view engine",'ejs'); // ejs 
//app.engine("handlebars", consolidate.handlebars); // see if it works
app.set("views" ,path.join(__dirname, "views"));

// the trust proxy
app.enable("trust proxy"); 
app.disable("x-powered-by"); // for security reasons

// some header
app.use(helmet()); // for security reasons

// set the port of the application
app.set("port", process.env.PORT || 3000); // a fallback to the 3000

/* Middleware */

// compress the responses for the user
app.use(compression({threshold: 1}));

// Adding the morgan and the filestore
const acessStream = rfs.createStream("access.log",{
    path: path.resolve(__dirname, "log"),
    interval: "1d",
    compress: 'gzip'
});

// addgin the mix in the flavour 
app.use(morgan("combined",{stream:  acessStream})); // for production
app.use(morgan("dev")); // for me to debug incase of anything or development

// seerver the hot potato 
app.use(serverFavicon(path.resolve(__dirname, "./public/img/favicon.ico"))); // there it is

// set the session details here
app.use(cookieParser());
app.use(session({
    secret: "bookappapi",
    resave: true, 
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
setPassport(); // done now
app.use(flash()); // flash technologys

// setting the form detail s
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// the free statuc filer
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));

/* Routers routes */
app.use("/book",bookRouter.router); // the router with the book functionallity
app.use(taskRouter.router); // the router for the task
app.use(userRouter.router); // the router for the user

/* App.listen */
const port = app.get("port"); /// get the port of the application

// now listen 
app.listen(port,()=>{
    console.log(`Book Library API started on port : ${port}.\nhttp://localhost:${port} to see more.`)
})