/* 
    TASK MANAGER _ PROJECT 1
    This is the main file of the project
    It is the entry point towards our application
*/
const express = require("express"),
helmet = require("helmet"),
path = require("path"),
cookieParser = require("cookie-parser"),
compression = require("compression"),
morgan = require("morgan"),
rfs = require("rotating-file-stream"),
passport = require("passport"),
session = require("express-session"),
passportSetup = require("./lib/setPassort"),
userRouter = require("./routes/user"),
db = require("./data/db");

// Start the instance of the application
const app = express();

// connect to the db
db.startDB();

// set the port and other details 
app.set("port", 3000);
app.set("env", "development");
app.disable("x-powered-by");
app.use(helmet());

// set the view and all that
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// setting up the morgan and the rfs
const acessStream = rfs.createStream("acess.log",{
    "compress": "gzip",
    interval: "1d",
    "path": "./logs"
});

app.use(morgan("combined", {stream: acessStream}));
app.use(morgan("dev"));

// use the cookeie parser and the session
app.use(cookieParser("51da989a-3120-4ad1-a37f-1dc606dd0ca6"));
app.use(session({
    secret: '77362034-e13d-45dd-8b4c-a5c1c1e40bd7',
    saveUninitialized: false, 
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
passportSetup.passportSetUp();

// the one to handle the forms
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// the static paths
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));

// middleware to fetch the user
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    console.log(req.user);
    next();
});

// initialte the routers
app.use("/user", userRouter); // for the user paths

// a trial paths 
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