/* This is the middleware that create updates read and delete the task */

// create the router 
const express = require("express");
const { newTask, editTask, getTask, delTask, getAllTask, filterByCat, filterByStatus, updateStatus } = require("../middleware/taskMiddleware");
const { Auth } = require("../middleware/auth");

// create the router 
const router = express.Router();

// esnure auth 
router.use(Auth); // ensure is auth

// path to create a new task. edit the task and get the main file for the render
router
    .route("/task")
    .get((req,res)=> res.render("task"))// redner the task.ejs ot hbs
    .post(newTask) // create the task 
    .put(editTask); // edit the task 

// the ones using the delete and get
router
    .route("/task/:id")
    .get(getTask) // get the task by the id
    .delete(delTask); // delete the task 

// now get all the task 
router.get("/task/all",getAllTask); 

// filter by the cat and then status
router.get("/task/:category",filterByCat);
router.get("/task/:status",filterByStatus);

// now to update the status
router.post("/task/update", updateStatus); // done now

// export the router out
exports.router = router;