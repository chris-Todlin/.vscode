/* 
    Weather Information API
        - This is the main entry to the API
*/

/* Modules */
const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/authtoken");
const weatherApi = require("./routes/weatherapi");
const mainRouter = require("./routes/main");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const dotenv = require("dotenv").config({path: path.resolve(__dirname, "./enviroment.env")});

/* create the application instance of express */
const app = express();

// start the database
mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log(`Datababase [Weather info] connected`);
        })
        .catch(err=>{
            console.error(err);
            console.log("Error in connecting to the database");
        });

/* Configurations */
//port 
app.set("port",process.env.PORT);
app.disable("x-powered-by"); // for security reasons

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

/* Middleware */
const accessStream = rfs.createStream("access.log",{
    interval: "1h",
    compress:"gzip",
    path: path.resolve(__dirname, "./log") // creates if none
});
app.use(morgan("combined",{stream: accessStream})); // for loggin
app.use(morgan("tiny"));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./node_modules/bootstrap/dist")));

/* The router handlers - errors */

app.use(weatherApi); /// the weather api
app.use(mainRouter); // the routes for the user
app.use(userRouter);

// login pat 
/* app.get("/",(req,res)=>{
    const payload = {sub:"weather_api", id:123, username: "mwakai mwadime", role: "user"};
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, {expiresIn: "15m"});

    // now set the cookie
    res.cookie("token", token,{httpOnly: true});
    res.redirect("/signedin");
});

app.get("/signedin", authenticateToken,(req,res)=>{
    res.send("Welcome, you are signed in");
}); */
//404
app.use((req,res,next)=>{
    res.status(404).send("404 - Resource not Found");
});

// 500
app.use((req,res,next)=>{
    res.status(500).send("500 - Internal Server Error");
});

/* Listen */
const port = app.get("port");

app.listen(port,()=>{
    console.log(`
        Weather Information API started - Port:${port}\n
        http://localhost:${port}\n\n> ROUTES\n
    `);
});