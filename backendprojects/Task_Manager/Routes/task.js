/* 
    - This is the part to make the routes of the task 
*/

// import the module
const express = require("express");
const { isAuthent } = require("../middleware/ensureAuth");
const addTask = require("../controller/addtask");
const { getAllTasks, filterTask, findTask } = require("../controller/readtasks");
const Task = require("../model/taskmodel");
const editTask = require("../controller/edit");
const deleteTask = require("../controller/delete");

/* Create the router */
const router = express.Router();

/* Ensure auth */
router.use(isAuthent);

// path for the famous task/tasks
router.get("/tasks",(req,res)=> res.render("tasks"));

// render the create form
router.get("/addtask",(req,res)=>{
    res.render("addtask")
}); // the form is here to add the task 

// now get the form or the details and vary them
router.post("/addtask",addTask); // a controller with data is to be added

//  a path to return all the tasks of that authenticated user
router.get("/alltasks",getAllTasks); // functioning if it is

// a router to get filtered by a status
router.get("/filter/:filter",filterTask); // done now

// the route to get a view indes
router.get("/viewtask/:id",async(req,res)=> {
    // now find the task and return it
    try {
        const task = await Task.findById(req.params.id);

        res.render("view",{
            task: task
        });
    } catch (error) {
        next(error); // throw out the error
    }
});

// router to get a single task 
router.get("/task/:id",findTask);

// router to edit the task in anyway
router.get("/edittask/:id",async (req,res)=>{
    // now find the task and return it
    try {
        const task = await Task.findById(req.params.id);

        res.render("edit",{
            task: task
        });
    } catch (error) {
        next(error); // throw out the error
    }
});

// router to get our task to be updated
router.post("/edittask",editTask);

// router to delete the tas 
router.get("/deletetask/:id", deleteTask);

// import it out
module.exports = router;