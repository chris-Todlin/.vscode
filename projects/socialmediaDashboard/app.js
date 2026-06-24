/* Our main inteface for the application */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');

// User defined one
const users = require('./model/users');
const posts = require('./model/postService');

const app = express();

/* configuration */
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.engine('handlebars', hbs.engine({extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Middleware */
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Routes */
const pathFile = path.resolve(__dirname, 'views/html');

app.get('/', (req,res)=>{
    res.sendFile('login.html', {root: pathFile});
});

app.get('/signup', (req,res)=>{
    res.sendFile('signup.html', {root: pathFile});
});

app.post('/login',(req,res)=>{
    const {name, password} = req.body;
    const message = users.checkUser(name, password);
    res.json({message: message, urlDirect: '/user'}); // Send back the message
});

app.post('/signup',(req,res)=>{
    const {name, password} = req.body;
    const message = users.addUser(name,password);
    res.redirect(303, '/');
});

app.get('/user/:name',(req,res)=>{
    const name = req.params.name;
    const postsUser = posts.returnPosts(name);
    res.render('main', {username: name, posts: postsUser});
});

app.get('/post',(req,res)=>{
    res.sendFile('post.html',{root: pathFile});
})

app.post('/post',(req,res)=>{
    const {username,title, content} = req.body;
    posts.savePost(username, title, content);
    res.redirect(303,`/user/${username}`);
})

/* Error middleware */

app.use((err,req,res,next)=>{
    console.error(err.stack); // print out the error
    res.status(500).sendFile('500.html', {root: pathFile});
});

app.use((req,res,next)=>{
    res.status(404).sendFile('404.html', {root: pathFile});
});

/* Listen part */
const port = app.get('port');
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})