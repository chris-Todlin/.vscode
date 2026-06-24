/* This is the routes specifically dedicated for the Task */

/* Modules */
const express = require("express");

// create the router
const taskRouter =  express.Router();

// tthe insex part for this router
taskRouter.get("/",(req,res)=>res.send("It's all good")); //-> replace latter with a ejs file

// the path to save the task 
//taskRouter.post("/newtask",/* function to save to task */);

// path to get all the task 
//taskRouter.get("/getall",/* function ther to do so */);

// path to get alnly one tasj 
//taskRouter.get("/task/:name",/* function in here */);

// path to delete a task 
//taskRouter.get("/delete/:id",/* middleware */);

// path to edit a task 
//taskRouter.get("/edit/:id",/* middleware */);

// path to edit the db task 
//taskRouter.post("/update",/* middleware responsible */)

// export this shitty man out
exports.taskRouter = taskRouter;