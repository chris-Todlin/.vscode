/* A unit conversion application example */
/* 
    uNIT CONVERSION APPLICATION
*/
const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionFile = require("session-file-store");
const { convertTemprature, convertFahToKel, convertKelToFah } = require("./lib/temprature_revised_edition");

// the express apllication
const app = express();

// setting the port of the application
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// setting the logger to catch all the sessionof requuest on the computer server
const accessStream = rfs.createStream("access.log",{
    compress: "gzip",
    interval: "1h",
    path: path.resolve(__dirname, "./log") // save here the log files and the gzips of the access
});

// now set it to save and also show you some error and requirest
app.use(morgan("combined",{stream: accessStream})); // for the saving
app.use(morgan("short")); // for you the user

// now dealing with the session of the user
const sessionStore = sessionFile(session);

// now add it to the session
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    store: new sessionStore({path: path.resolve(__dirname, "./session")}),
    secret: "This is a secret key save it for now"
}));

// setting up the form thing incase it is a form on 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.resolve(__dirname, "./public")));

// afunction for a must for all the session of the user
app.use((req,res,next)=>{
    if(req.session.user){
        next();
        return;
    }

    // else start he session
    const user = Date.now();

    // fornt he new user
    req.session.user = {username: user,id : Math.floor(Math.random() * 100 + 1)}; // the session user

    // go to the next middleware
    next();
});

// the main path 
app.get("/",(req,res)=>{
    res.render("index");
});

// The functionlait to convert temprature
app.post("/converttemprature", (req,res,next)=>{
    try {
        let results;
        const {from, value, to} = req.body;


        console.log(from,value, to);

        if(from === "kelvin" && to ==="fah"){
            results = convertKelToFah(value);
        } else if(from === "fah" && to ==="kelvin"){
            results = convertFahToKel(value);
        } else {
            // The validation is done in the fron end
            results = convertTemprature(from,value, to);
        }

        console.log(results);

        res.json({result: results, from: from, value: value, to: to}); // return them now
    } catch (error) {
        res.json("error in conversion");
        next(err); // pass on the error;
    }
})

// now the listen part of the application or server
const  port = app.get("port");
app.listen(port,()=>{
    console.log(`Unit Conversion Application started at port: ${port}.\nhttp://localhost:${port}`);
});