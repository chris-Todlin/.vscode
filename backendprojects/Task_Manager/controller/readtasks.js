/* This function of file has all the function to read the tasks */

// - Read all of them
// - Filter by a certain metric
// - retrieve a single one by Id

/* modules needed */
const Task = require("../model/taskmodel");

// function to get all of them for that user
async function getAllTasks(req,res,next){
    // the req.user._id is an important on in the determination of the specific
    try {
        const tasks = await Task.find({username: req.user._id});

        // send them to the from end in API formart
        res.json({tasks: tasks});
    } catch (error) {
        next(error); // throw out the error
    }
}

// function to filter a single task - task/filter/:filter
async function filterTask(req,res,next){
    // get the filter cause in the param
    const filterDef = req.params.filter;

    try {
        const tasks = await Task.find({username: req.user._id,  category: filterDef}) || [];

        // send the json file to the server
        res.json({filteredTasks : tasks});
    } catch (error) {
        next(error); // thhrow the error
    }
}

// function to return after find by id
async function findTask(req,res,next){
    // get the filter cause in the param
    const id = req.params.id;

    try {
        const task = await Task.findById(id) || "undefined";

        // send the json file to the server
        res.json({task : task});
    } catch (error) {
        next(error); // thhrow the error
    }
}

// export it out
module.exports.getAllTasks = getAllTasks;
module.exports.filterTask = filterTask;
module.exports.findTask = findTask;