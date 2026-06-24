/* This is the middleware for the task functionlality */

const { createTask, readTask, updateTask, deleteTask, readByCat, readByStatus, updateStatus } = require("../controller/taskFunc");

// create the task 
async function newTask(req,res,next) {
    try {
        // get the form details 
        const {title, description, category, status} = req.body;
        // create the Task
        await createTask(req.user._id,title, description,category, status,function(err,task){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!task){
                return res.json({message: "Unable to create task"});
            }

            // if the task has been created
            res.json({message: "Task created and saved!"});
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// read a task by id 
async function getTask(req,res,next) {
    try {
        // read one task by id
        await readTask(req.params.id,function(err,task){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!task){
                return res.json({message: "Unable to get task"});
            }

            // if the task has been created
            res.json(task);
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// read all the task 
async function getAllTask(req,res,next) {
    try {
        // read one task by id
        await readTask(req,function(err,tasks){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!tasks){
                return res.json({message: "Unable to get tasks"});
            }

            // if the task has been created
            res.json(tasks);
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// update all the tasks 
async function editTask(req,res,next) {
    try {
        // get the form details 
        const {title, description, category, status} = req.body;
        // create the Task
        await updateTask(req,title, description,category, status,function(err,task){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!task){
                return res.json({message: "Unable to update task"});
            }

            // if the task has been created
            res.json({message: "Task updated and saved!"});
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// delete the task 
async function delTask(req,res,next) {
    try {
        // read one task by id
        await deleteTask(req.params.id,function(err,task){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!task){
                return res.json({message: "Unable to delete task"});
            }

            // if the task has been created
            res.json({message: "Task deleted sucessfully!"});
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// functionality - status change 
async function editStatus(req,res,next) {
    try {
        // get the form details 
        const {id, status} = req.body;
        // create the Task
        await updateStatus(id,status,function(err,task){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!task){
                return res.json({message: "Unable to update status"});
            }

            // if the task has been created
            res.json({message: "Status updated and saved!"});
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// filter by category 
async function filterByCat(req,res,next) {
    try {
        // read one task by id
        await readByCat(req,function(err,tasks){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!tasks){
                return res.json({message: "Unable to filter task"});
            }

            // if the task has been created
            res.json(tasks);
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// filter by status 
async function filterByStatus(req,res,next) {
    try {
        // read one task by id
        await readByStatus(req,function(err,tasks){
            if(err) return next(err); // throw the error an return 

            // if there is no return 
            if(!tasks){
                return res.json({message: "Unable to filter task"});
            }

            // if the task has been created
            res.json(tasks);
        });
    } catch (error) {
        next(error); // throw an error out
    }
}

// export them out 
exports.newTask = newTask;
exports.getTask = getTask;
exports.getAllTask = getAllTask;
exports.editTask = editTask;
exports.delTask = delTask;
exports.updateStatus = updateStatus;
exports.filterByCat = filterByCat;
exports.filterByStatus = filterByStatus;