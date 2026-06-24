/* Forming the server to our question application */
const express = require('express');

// The Application
const app = express();

// Set the middle ware cors and morgan
const cors = require('cors');
const morgan = require('morgan');
const questions = require('./questions');
const path = require('path');
// The port of the sert
const port = process.env.PORT || 3000;

// For the path for now
const options = {root: path.join(__dirname, "./public")};
app.use(express.static(path.resolve(__dirname, './public')))

// The setting of the app
app.use(cors());
app.use(morgan('dev'));

// The routes 
app.get('/',(req, res)=>{
    res.sendFile('html/index.html',options);
    res.status(200);
})

/* app.get('/redirect', (req,res)=>{
    res.sendFile('thankyou.html',options);
}) */

// Path for the questions
app.get('/question/:numb',(req,res)=> {
    const pos = req.params.numb;
    const question = questions[pos];
    if(pos < questions.length) {
        res.json(question);
    } else {
        res.json({message: "Question Does not exist"});
        res.status(404);
    }
})

// listenn to the port
app.listen(port,()=> console.log(`Server is running on port http://localhost:${port}`));