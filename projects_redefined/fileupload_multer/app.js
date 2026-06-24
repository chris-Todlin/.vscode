/* 
    Single File Upload With Multer and Express

    Routes: 
        1. upload
        2. delete
        3. View
*/

const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');

const app = express(); // The server of ours

/* confuguration of setting the server settings */
app.disable('x-powered-by');
app.set('port',process.env.PORT || 3000); // port
app.engine('handlebars',hbs.engine({defaultLayout: 'main',extname:'handlebars'}));
app.set('view engine','handlebars');
app.set('views', path.join(__dirname, 'views'));

// Some itro of terms such as diskstorage
const diskStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './upload/');
    },
    filename: (req,file,cb)=>{
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: diskStorage,
    limits: {
        'fileSize': 11000000,
    }
});

/* The middlewares, obvious ones */
app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, 'public'))); // for js and css file if any
app.use(express.static(path.resolve(__dirname, './node_modules/bootstrap'))); // for js and css file if any

/* Routes */

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/upload', upload.single('file'),(req,res)=>{
    res.redirect('/');
})

// The error handlers
app.use((err,req,res,next)=>{
    console.log(err.stack); // print the errors out
    res.status(500).send('500 - Internal Server Error');
});

app.use((req,res,next)=>{
    res.status(404).send('404 - Resource Not found!');
});

/* Listenign */
const port = app.get('port');
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});