/* A bloggin apliction */
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const users = require('./model/userservice');
const morgan = require('morgan');

const app = express();

/* Configuration of the application */
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', hbs.engine({extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views','./views');

/* Middleware */
app.use(morgan('dev'));// Logger
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Routes */
const pathFile = path.resolve(__dirname, 'views/html');
let userName;

    /* DEfault or normal ppaths */
app.get('/', (req,res)=>{
    res.status(200).render('home');
});

app.get('/signup',(req, res)=>{
    res.status(200).sendFile('signup.html',{root: pathFile});
});

app.get('/blogger/:username', (req,res)=>{
    let userName = req.params.username;
    userName = userName.replace(userName[0], userName[0].toUpperCase());
    res.render('blogger', {layout: 'blog',name: userName});
});

app.post('/signup',(req, res)=>{
    const {username} = req.body;
    userName = users.checkUser(username);
    res.redirect(303, `/blogger/${userName}`);
});

    /* Error Paths */
app.use((req,res,next)=>{
    res.status(404).sendFile('404.html',{root: pathFile});
});

app.use((err,req,res,next)=>{
    console.error(err.stack); // log out the error
    res.status(500).sendFile('500.html',{root: pathFile});
});

/* Listening part */
const port = app.get('port');
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
});