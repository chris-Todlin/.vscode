/* 
    Chapter 1: Getting Started on Express
    - setting the engine read for the sail
*/
/* MODULES */

const express = require("express");
const compression = require("compression");
const mongo = require("mongoskin");
const session = require("express-session");
const {RedisStore} = require("connect-redis");
const dotenv = require("dotenv").config({path: './ls.env'});
const http = require("http");

/* APPLICATION AND DB */
const app = express();
const db = mongo.db("mongodb://localhost/intergration_tests",{native_parser: true});

/* CONNECTING TO DATABASE */
//const redisStore = RedisStore(session);
app.use(session({
    store: new RedisStore(Options),
    secret: 'Pro express.js rocks!'
}));

/* CONFIGURATION */
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000); // prevent an thing from desctroing that 

/* MIDDLEWARE */
app.use(express.json());

/* RUOTES */
app.get("/", renderHomePage);

/* STARTING THE APPLICATION */
const server = http.createServer(app);
const port = app.get("port"); // the port of the server
const boot = function(){
    server.listen(port, ()=>{
        console.info(`Express server listening on port ${port}`);
    });
};
const shutdown = function(){
    server.close();
};

/* CHECK FOR THE START OR EXPORT */
if(require.main === module){
    boot(); // start the server
} else {
    console.info("Running app as a module");
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = port;
}