/* This is the one to return the task or so */

const Tasks = require("../data/tasks");
const Todo = require("../model/todo");

/* 
    -> I think we need a change since the users can either login or not, but for the logger the notes must be specific
    -> If not thenrelease the ones without the username but mark it somehow
*/

// function to return all the data
async function returnAllTasks(req,res,next){
    try {
        let todos;

        if(req.user){
            todos = await Todo.find({username: req.user._id}); // this are his
        } else {
            todos = [];
        }

        return todos;
    } catch (error) {
        next(error); // throw the error out
    }
}

// function to filter the tasks
/// future use only

module.exports.returnAllTasks = returnAllTasks;