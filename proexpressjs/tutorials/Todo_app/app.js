/* This is the server main application entry - careful it is delicate */
const express = require("express");
const http = require("http");
const path = require("path");
const mongoskin = require("mongoskin");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const methodOverrride = require('method-override');
const cookieparser = require("cookie-parser");
const session = require("express-session");
const csurf = require("csurf");
const errrorHandler = require("errorhandler");
const helmet = require("helmet");

/* Routes imported */
const routes = require("./routes"); // would fetch the index js path file in the folder
const tasks = require("./routes/task");

/* APP and DB */
const app = express();
const port = 3000; 

// start the db 
const db = mongoskin.db("mongodb://localhost:27017:todo?auto_reconnect",{safe: true});

/* Settig the env */
app.set("port",process.env.PORT || port);
app.disable("x-powered-by");
app.use(helmet()); // security first
app.locals.appname = 'Express.js Todo App'; // app name to use in the rendered views

// set the views ready for the use
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'jade');

/* Middleware - vendor */
//app.use(favicon(path.join('public','favicon.ico'))); // server the favicon

// now the logger 
app.use(morgan('dev'));

// for the form 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// the override method here
app.use(methodOverrride());

// using the csrf
app.use(cookieparser('CEAF3FA4-F385-49AA-8FE4-54766A9874F1'));
app.use(session({
    secret: '59B93087-78BC-4EB9-993A-A61FC844F6C9',
    resave: false, 
    saveUninitialized: true
}));
app.use(csurf());

// to preocess the less 
app.use(require("less-middleware")(path.join(__dirname, "./public")));

// static files
app.use(express.static(path.join(__dirname, "public")));

/* Middleware for the paths */
app.use(function(req,res,next){
    req.db = {};

    req.db.tasks = db.collection('task'); // fetch them all 
    // add the cris token here 
    res.locals._csrf = req.csrfToken();
    next();
});

// now using te param
app.param('task_id',function(req,res,next,taskId){
    req.db.task.findById(taskId, function(err, task){
        if(err){
            return next(err);
        }

        if(!task) return next(new Error('Task is not found.'));

        req.task = task;
        return next();
    });
});

/* hadnlers */

// the main page 
app.get("/",routes.index);

// to do list page 
app.get('task', tasks.list);

// mark all as done
app.post("/tasks",tasks.markAllCompleted);

// add task 
app.post("/tasks",tasks.add);

// mark as complete
app.post("/task/:task_id", tasks.markComplete);

// delete a task 
app.delete("/task/:task_id", tasks.del);

// function to get all the completed task 
app.get("tasks/completed",tasks.completed);

/* Error hanlder */
app.use((req,res,next)=>{
    res.status(404).send();
});

// configure the diffrent behaviour
if('development' === app.get('env')){
    app.use(errrorHandler());
}

// start the application 
http.createServer(app).listen(port,()=>{
    console.log("Express server lisntening on port %d.\nhttp://localhost:%d",port,port);
});