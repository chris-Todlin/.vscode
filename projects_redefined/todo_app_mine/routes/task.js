/* 
    This is the router for the task activities
    It would host all of them here in
    Share with me the journey of faristos
    It would import the module from the middleware to handle the complet this while 
    keeping it sinple
    - Router is the way
    - Use must be auth to acess this so fuuc it, I am here in
    - Auth shold be in
*/
const express = require("express");
const functTask = require("../middleware/taskmethods");
const authUser = require("../middleware/auth");

const router = express.Router();

// make sure auth 
router.use(authUser.loggedIn);

// task one render the index file wher all the task are in and the add button plus the greeting for the user
// going to house the index.ejs
// create a task 
router.route("/")
    .get((req,res)=> res.render("index"))
    .post(functTask.createTask)

// path to view all the tasks
router.get("/all", functTask.viewAll);

// export the orouter 
module.exports.router = router;