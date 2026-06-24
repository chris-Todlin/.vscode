/* This is the main app object */
/* Modules of the application or server */
const express = require("express");
const session = require("express-session");
const sessionFile = require("session-file-store");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
//const flash = require("connect-flash");
const errorhandler = require("errorhandler");
const path = require("path");
const cluster = require("cluster");
const dotenv = require("dotenv").config({path: "./server.env"});

/* The router there in */
const task = require("./routes/task"); // the path of the routes

/* APP AND DB */

// set the app on the pace
const app = express();

// set the database of the server
mongoose.connect("mongodb://localhost:27017/Todo-App")
        .then(()=>{
            console.log("Database connected [Todo-App]");
        })
        .catch(err =>{
            console.log("Database connected [Todo-App]");

            if(app.get('env') === 'development'){
                console.error(err); // the  error to debug here in
            }
        });

/* Configurarrtion adn setting of the server details */

// set the port and the environment of the server
app.set("port", process.env.PORT || 3000);
app.set("env",process.env.NODE_ENV);

// setting the view of the server
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// set the appname
app.locals.appName = "Todo App";

// now set the header of the server by the helmet
app.use(helmet()); // security of the headers are all good

/* middleware to be use by the server */
// compress the response
app.use(compression({threshold: 0}));

// then set the morgan and the store 
const acessStream = rfs.createStream("access.log",{
    compress: "gzip",
    interval: "1d",
    path: path.resolve(__dirname, "log")
});

app.use(morgan("combined", {stream: acessStream}));
app.use(morgan("dev"));

// set the session and the session store 
const sessionStore = sessionFile(session);

app.use(cookieParser('467e2233-0339-49c3-a0f3-436aedd09cfd'));
app.use(session({
    store: new sessionStore({
        path: path.resolve(__dirname, "./sessionStore")
    }),
    secret: 'cb28e871-ff34-4dc9-9628-2eab8bc6d0c4',
    resave: false,
    saveUninitialized: true
}));
//app.use(csurf());

// settign the form details part
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// now the static part of the file or server
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.resolve(__dirname, "./public")));

// handler for assigning the csurftoken
app.use((req,res,next)=>{
    // now assign the session
    if(!req.user) {
        // assign the session
        req.user = {username: require("crypto").randomUUID(), id: require("crypto").randomBytes(5)};
    }

    // now set the scust token
    //res.locals._csurf = req.csrfToken(); // it is assigned
    console.info(`Cluster ${cluster.worker.process.pid} responded \n`);

    // continue
    next();
});

/* Routes to use */
app.use(task.router); // the router there

/* Error handlers */
app.use((req,res,next)=>{
    // render the 404 error
    res.status(404).render("404");
});

// now the 500.ejs
if(app.get("env") === "development"){
    app.use(errorhandler());
} else {
    app.use((err,req,res,next)=>{
        // print the error
        console.error(err);
        // render the 500 error
        res.status(500).render("500");
    });
}

exports.app = app;