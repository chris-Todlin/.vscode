/* This is the main app under which our project would be hosted */
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const routerPublic = require('./routers/public');
const routerStatic = require('./routers/static');
const routerViews = require('./routers/views');

// Start the application
const app = express();
const port = process.env.PORT || 3000;

// the middleware interfacing
app.use(cors());
app.use(morgan('common'));

// Serve them without having tosend any files
//const options = {root: path.join(__dirname, "./public")};
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'views')));

// router
app.use('/public', routerPublic);
app.use('/static', routerPublic);
app.use('/views', routerPublic);

// Default route
app.get('/',(req,res)=>{
    res.status(200).render('index.html');
})

// The listens
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})