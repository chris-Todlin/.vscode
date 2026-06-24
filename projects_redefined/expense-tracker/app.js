/* Expense tracker application */
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");

// router for the sub application
const Userrouter = require("./routes/userroute");
const setupPassport = require("./lib/passportsetup");
const router = require("./routes/expenseRoute");

// Start the application
const app = express();

// start the database for the expense
mongoose.connect("mongodb://localhost:27017/expense-tracker")
        .then(()=>{
            console.log("Database connected!");
        })
        .catch(err=>{
            console.log("Error in connecting to te database!");
            console.error(err);
        })

// setting the port
app.set("port", process.env.PORT || 3000);

// setting the views
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname, "./views"));

// Setting up the morgan and rfs 
const accessStream = rfs.createStream("acess.log",{
    path: path.resolve(__dirname, "./log"),
    compress: "gzip",
    interval: "1d"
});
app.use(morgan("combined",{stream: accessStream}));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(session({
    secret: "This is a secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
setupPassport();

// SEt up the local for the errors and current user
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.infos = req.flash("info") || [];
    res.locals.errors = req.flash("error") || [];
    next();
});

// the static files
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// The default routes
app.use("/",Userrouter);
app.use("/expense",router);

// the error handlers
app.use((req,res,next)=>{
    res.render("404");
});

app.use((err,req,res,next)=>{
    console.error(err); // get the error for you to debug
    res.render("500");
});

// Listen to the port
const port = app.get("port");
app.listen(port, ()=>{
    console.log(`App started at port : ${port}.\nhttp://localhost:${port}`);
});