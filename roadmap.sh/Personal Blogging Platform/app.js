/* 
    This is the main entr to any blog request
    It handle all of them in one

    // we use the express and it as the main for the testing part then added in 
        in the main program after it gian an intriduction into the device
*/

const express = require("express");
const mongoose = require("mongoose");
const blog = require("./routes/blog");
const db = require("./config/sqlitedb").db; // for the sqlite3 database

// start eh db
mongoose.connect('mongodb://localhost:27017/blog_roadmap')
.then(()=>{console.log("Database inside the game")})
.catch(err=> console.error(err));

// creat ethe router 
const app = express(); // we would replace it with the expres.app()

// allow for the data inside to do its thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/blog", blog.router);

app.listen(3000,()=>{
    console.log("server running on port: 3000");
});