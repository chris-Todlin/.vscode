/* A single page application */
const express = require("express");
const morgan  = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const session = require("express-session");
const store = require("session-file-store");

const app = express();

// settig the port
app.set("port", process.env.PORT || 3000);
// Setting up the routes loogging functionaligy
const acessStream = rfs.createStream("acess.log",{
    interval: "1h",
    compress: "gzip",
    path: path.resolve(__dirname, "./log")
});
const sessionStore = store(session);

// The logger
app.use(morgan("combined", {stream: acessStream}));
app.use(morgan("tiny"));
app.use(session({
    cookie: {
        signed: true,
        'maxAge': 10 * 60 *60,
        'httpOnly': true
    },
    secret: "This is our secret code",
    resave: true,
    saveUninitialized: true,
    store: new sessionStore({
        path: path.resolve(__dirname, './session')
    })
}));
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));

// Middleware for setting the user name
app.use((req,res,next)=>{
    if(!req.session.user){
        req.session.user = {username: "newuser",id: Date.now};
    }
    console.log("Already in session");
    next();
});

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

/* The 404 and 500 error handlers */
app.use((req,res,next)=>{
    res.status(404).send("404: Resource Not Found!");
});

app.use((err,req,res,next)=>{
    console.error(err.stack); // print out the error
    res.status(500).send("500: Internal server Error!");
});

// Listen
const port = app.get("port");
app.listen(port, ()=>{
    console.log(`App started at port ${port}.\nhttp://localhost:${port}`);
});