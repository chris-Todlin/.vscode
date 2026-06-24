/* This is the route to handle all the routes to the task functionlity */
const express = require("express");
const { returnAllTasks } = require("../lib/todosMethods");
const deleteTask = require("../lib/deletetask");
const addNewTask = require("../lib/addtask");
const editTask = require("../lib/editTask");
const editNewTask = require("../lib/editnewtask");

// create the router
const router = express.Router();

// the router handler for the / -> render the task.ejs with a form and the place to render the tasks
router.get("/",(req,res)=>{
    res.render("task");
});

// Route to get all the task out
router.get("/tasks",async(req,res,next)=>{
    const todos = await returnAllTasks(req,res,next);
    const returnTodos = todos.map(el =>( {
        id: el._id,
        todo: el.todo
    })) || []; // return an empty array
    res.json(returnTodos);
});

// function to get the new task form
router.get("/addtodo",(req,res)=> res.render("add"));

// now for the post one to add the tasks
router.post("/addtask",addNewTask);

// functionality to edit the tasks
router.post("/edittask",editNewTask);

// route to edit the task 
router.get("/edit/:id",editTask);

// route to delete the task in the list
router.get("/delete/:id",deleteTask);

// export it back 
module.exports = router;