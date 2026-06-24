/* Create a server to enter the jobs */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const hbs = require('express-handlebars');
const {jobs, addJob, fetchJobs} = require('./data/jobs');

const app = express();

// Some constant terms
const acessStream = rfs.createStream('access.log',{
    compress: 'gzip',
    interval: '1h',
    path: './log'
});

// Configuration
app.set('port',process.env.PORT || 3000);
app.disable('x-powered-by');
app.engine('handlebars', hbs.engine({defaultLayout: 'main','extname': 'handlebars'}));
app.set('view engine','handlebars');
app.set('views','./views');

// Middleware
app.use(morgan('combined',{stream: acessStream}));
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

//Routes
const pathHtml = path.resolve(__dirname, 'views/html')
/* 
    PATHS
*/
app.get('/',(req,res)=>{
    res.sendFile('login.html',{root: pathHtml});
});

app.post('/login',(req,res)=>{
    const {username, password} = req.body;
    console.log(req.body);
    res.sendFile('signin.html',{root: pathHtml});
});

app.get('/job',(req,res)=>{
    res.render('job');
});

app.post('job',(req,res)=>{
    const {title, description} = req.body;
    if(req.session.username){
        addJob(req.session.username, title, description);
        res.json({sucess:true, urlRedirect: '/getjobs'});
        return;
    } else {
        res.redirect(303, '/login')
        return;
    }
})

app.get('/getjobs',(req,res)=>{
    res,json({jobs: fetchJobs(req.session.username)});
});

app.use((err,req,res,next)=>{
    console.error(err.stack); // Print it out
    res.status(500).sendFile('500.html',{root: pathHtml});
});

app.use((req,res,next)=>{
    res.status(404).sendFile('404.html',{root:pathHtml});
});

// Listen
const port = app.get('port');
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${[port]}`);
});