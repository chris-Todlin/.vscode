/* Fitness Tracker [frontend && Backend] */
/* Modules, import */
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const sessionFile = require('session-file-store');
const session = require('express-session');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const hbs = require('express-handlebars');
const user = require('./data/users');
const auth = require('./middleware/auth');
const {saveWorkout, fetchWorkoutLog} = require('./data/workouts');

const app = express(); // Start the application or server

/* cconfiguration */
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.engine('handlebars', hbs.engine({extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views','./views');

/* Middleware */
const fileStore = sessionFile(session); // create session file
// Creating the stream for the logger
const acessStream = rfs.createStream('acess.log',{
    'compress': 'gzip',
    interval: '1h',
    'path': path.resolve(__dirname, 'logs'),
}); 
app.use(morgan('combined',{stream: acessStream})); // Logs into te file in the log dir
app.use(morgan('tiny')); // logger
// the session of the user, store by the session file
app.use(expressSession({
    store: new fileStore({path: path.resolve(__dirname, 'sessions')}),
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000*60*60,
        signed: true,
        httpOnly: true
    },
    resave: false, 
    saveUninitialized: false,
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Paths/routes */
const pathHtml =  path.resolve(__dirname, 'views/html');
app.get('/',(req,res)=>{
    res.render('main', {session: req.session.user}); // render the home one
});

app.get('/register',(req,res)=>{
    res.sendFile('register.html',{root:pathHtml})
});

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:pathHtml})
});

// function for the session
function sessionInitiate(req,username, pass){
    if(!req.session.user){
        req.session.user = {username, id:pass};
    }
}

app.post('/register',(req,res)=>{
    const {username, password} = req.body;
    // save user
    user.addUser(username, password);
    // function to create session
    sessionInitiate(req,username, password);
    res.redirect(303, '/login');
});

app.use((req,res,next)=>{
    if(req.session.user){
        res.status(401).json({message: "not exist"});
        return;
    }

    next();
});

app.post('/login',(req,res)=>{
    const {username, password} = req.body;
    // function to create session
    sessionInitiate(req,username, password);
    // check of the user exist and check if the pass is correct
    res.json({message: "Logged In"});
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect(303, '/'); // send them back homes
});

app.get('/home',(req,res)=>{
    // create the session
    res.send('Welcome home');
});

app.get('/workouts',(req,res)=>{
    //send the form of the workout
});
app.post('/workouts',(req,res)=>{
    const {username,type, duration, calories} = req.body;
    //save the tasks
    if(req.session.username === username){
        saveWorkout(req.session.username,type, duration, calories);
        res.json({message: "saved"});
        return;
    }

    res,json({message: "No user to save to!"});
});

app.get('/workouts/:user',(req,res)=>{
    res.json(fetchWorkoutLog(req.session.username));
})

// 500 - middleware
app.use((err,req,res,next)=>{
    console.error(err.stack); // output the error
    res.status(500).sendFile('500.html',{root: pathHtml});
});

app.use((req,res,next)=>{
    res.status(404).sendFile('404.html',{root: pathHtml});
});

/* Running */
const port = app.get('port');
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});