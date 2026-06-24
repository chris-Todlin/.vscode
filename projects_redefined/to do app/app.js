const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session');
const authoriseUser = require('./middleware/auth');
const tasks = require('./lib/tasks');

const app = express();

// Setting upt the views of the handlebars
app.engine('handlebars', hbs.engine({extname: 'handlebars',defaultLayout:'main'}));
app.set('view engine','handlebars');

// Logging
app.use(morgan('short'));
app.use(session({
    'cookie': {
        'maxAge': 10 * 60 * 60,
        'signed': true,
        'httpOnly' : true,
        'sameSite': true
    },
    'saveUninitialized': false,
    'resave' : false,
    'secret': 'This is the secret'
}));
app.use(express.urlencoded({extended:false}));
//app.use((req,res,next)=>authoriseUser(req,res,next));

app.get('/',(req,res)=>{
    res.locals.tasks = tasks; // Make then available here
    res.render('main');
});

app.get('/add-task',(req,res)=>{
    res.render('form');
});

app.post('/addtask',(req,res,next)=>{
    const {name, task} = req.body;
    if(!name||!task){
        res.json({sucess:false});
        return;
    }
    tasks.push({id: tasks.length + 1,title: name, task: task});
    res.status(202);
    next();
});

app.use('/addtask',(req,res)=>{
    res.redirect(303,'/');
});

app.get('/edittask/:id',(req,res)=>{
    const task = tasks.find(el => el.id === parseInt(req.params.id,10));
    if(!task){
        res.redirect(303,'/');
        return;
    }
    res.locals.task = task;
    res.render('edit');
});

app.post('/edittask',(req,res,next)=>{
    const {id,name, task} = req.body;
    console.log(tasks);
    if(!name||!task){
        res.json({sucess:false});
        return;
    }
    console.log('Save me!');
    // save the task
    console.log(taskEdit);
    tasks[taskEdit].title = name;
    tasks[taskEdit].task = task;
    console.log(tasks);
    res.redirect(303,'/')
});

app.use((req,res,next)=>{
    res.status(404).render('404');
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(3000,()=>{
    console.log(`Server started at port 3000.\nhttp://localhost:3000`);
});