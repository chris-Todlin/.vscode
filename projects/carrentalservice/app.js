/* Car Rental service */
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const multer = require('multer');
const bodyParser = require('body-parser');
const cars = require('./routes/rent');

const app = express(); // our application

/* configurations */
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', hbs.engine({defaultLayout: 'main', extname: 'handlebars'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Middleware */
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/rentcars', cars);

/* Routes */
app.get('/',(req,res)=>{
    res.sendFile('carrent.html',{root: path.resolve(__dirname, './public/html')});
});

/* Error routes */
app.use((req,res,next)=>{
    res.status(404).send('404 - Resource Not Found!')
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('500 - Internal Server Error');
});

/* listening */
const port = app.get('port');
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});