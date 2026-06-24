/* 
    This is the function interfacing the database and the middleware to prevennt any cooperation confusion.
    It would work with all the scenarios to be used till.
    Incase of anything involving the tasks, here is the start
    It includes:-
        - create Task (mongoose way)
        - view All tasks
        - Filter by status
        - Filter by category
        - update a task by id
        - Mark as completed by id
        - Mark as uncompleted by id
        - view one task 
        - delete task by id
*/
const Task = require("../model/taskmodel");

// function to create a task 
module.exports.createTask = async function(req, res, next/* call back incase of error from the middleware */){
    try {
        const {title, description, category} = req.body; // assuming default and trustworthy citizens

        // now create the task 
        const taskCreated = await Task.task.create({
            username: req.user._id,
            title: title, description: description, category: category
        });

        if(taskCreated)  return res.json({message: "Task created!"});
        return res.json({message: "Error in creating task"});
    } catch (error) {
        next(error);
    }
}

// function to view all the tasks
module.exports.viewAll = async function(req,res,next){
    try {
        const tasks = await Task.task.find({username: req.user._id});
        return res.json({tasks: tasks}); // return the tasks ack
    } catch (error) {
        next(error);
    }
}

// function to filter by status / completed
/* 
    I am going to combime the cstatus and the completed
    The frontend is going to send not only the status but also the type(stsus or completed)
    Using the params
    /status/completed
    /category/work
*/
module.exports.filterBy = async function(req,res,next){
    try {
        const {key, value} = req.params;
        const tasks = await Task.task.find({username: req.user._id, key: value});
        return res.json({tasks: tasks}); // return the tasks ack
    } catch (error) {
        next(error);
    }
}

// function to update a task by id
// embedd the id in the hidden form element
// autofill the other details for the user to edit what he wants
module.exports.updateTask = async function(req,res,next){
    try {
        const {id,title, description, category, status} = req.body;
        const task = await Task.task.findById(id);

        if(!task) return res.json({message: "No such task exists!"});

        // now update the task 
        await Task.task.updateOne(
            {_id : id},
            {username: req.user._id, title: title, description: description, category: category}
        )
        return res.json({message: "Task updated sucessfully!"}); // return the tasks ack
    } catch (error) {
        next(error);
    }
}

// funciton to mark as completed
module.exports.markAsCompleted = async function(req,res,next){
    try {
        const task = await Task.task.findById(req.params.id);

        // if the task is not here incase of wrong id or deleted
        if(!task) return res.json({message: "No such task exists!"});

        // ow update thetask 
        await Task.task.updateOne(
            {_id: req.params.id}, {status: true}
        )
        return res.json({message: "Marked as complete!"});
    } catch (error) {
        next(error);
    }
}

// function to do the reverse of that 
module.exports.markAsPending = async function(req,res,next){
    try {
        const task = await Task.task.findById(req.params.id);

        // if the task is not here incase of wrong id or deleted
        if(!task) return res.json({message: "No such task exists!"});

        // ow update thetask 
        await Task.task.updateOne(
            {_id: req.params.id}, {status: false}
        )
        return res.json({message: "Ummarked as complete!"});
    } catch (error) {
        next(error);
    }
}

// function to view only one task 
module.exports.viewById = async function(req,res,next){
    try {
        const task = await Task.task.findById(req.params.id);
        if(!task) return res.json({message: "No such task exists!"});
        return res.json({task: task}); // return the tasks ack
    } catch (error) {
        next(error);
    }
}

// funciton to delete a task 
module.exports.viewById = async function(req,res,next){
    try {
        const task = await Task.task.findById(req.params.id);
        if(!task) return res.json({message: "No such task exists!"});

        // delete the task oby the id
        await Task.task.deleteOne({_id: id});
        return res.json({message: "Task deleted!"});
    } catch (error) {
        next(error);
    }
}