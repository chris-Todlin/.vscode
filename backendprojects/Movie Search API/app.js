/* 
    MOVIE SEARCH API

        -> SEARCH A MOVIE 
*/

/* MODULES */
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const rfs = require("rotating-file-stream");
const dotenv = require("dotenv").config({path: "./file.env"});
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const mongoose = require("mongoose");

// routes
const errorHandlers = require("./middleware/errors"); 
const { movieRouter } = require("./routes/movieSearch");
const { taskRouter } = require("./routes/task");

/* APP AND DB */
const app = express(); // starting the instance of the express object
mongoose.connect("mongodb://localhost:27017/movie")
        .then(()=>{
            console.log("[MOVIE DB] connected")
        })
        .catch(err=>{
            console.log("error in connecting to db");
            console.error(err.stack);
        });

/* CONFIGURATION */
// set the env and port
app.set("env",process.env.NODE_ENV);
app.set("port", process.env.PORT || 3000);

// set dome tru
app.enable("trust proxy");
app.disable("x-powered-by");

// set the views
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));

/* MIDDLEWARE */
// before anything 
app.use(compression({threshold: 1})); // compress all the responses

// set the logger 
const acessStream = rfs.createStream("access.log",{
    interval: "1d",
    compress: "gzip",
    path: path.resolve(__dirname, "logs")
});
app.use(morgan("combined", {stream: acessStream})); // done saving hem 
if(app.get("env") === "development"){
    app.use(morgan("tiny")); // for the console or development
}

// for the static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

// the fomr
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Routes */
app.use("/movie",movieRouter); // the novie router
app.use("/task",taskRouter); // for the task 

/* ROUTES */
app.get("/",(req,res)=> {res.render("index")});

/* ERROR HANDLERS */
app.use(errorHandlers.handler404); // for the 404 
app.use(errorHandlers.handler500); // for the 500 

/* LISTEN AND START */
const port = app.get("port");
app.listen(port,()=>{
    console.info("Movie search API is running on port %s. Open http://localhost:%s for more",port,port);
});