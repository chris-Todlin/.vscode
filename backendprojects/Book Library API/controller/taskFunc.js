/* This is the function handled by the task jobs - anything */

/* Modules required */
const {Task} = require("../model/taskModel");

// functionality - add a Task 
async function createTask(username,title,description, category, status,cb/* callback function for that */){
    try {
        // create the task 
        return cb(null, await Task.create({
            username: username,
            title: title, 
            description: description,
            category: category,
            status: status
        })); // task created
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// functionality - read a task 
async function readTask(id,cb/* callback function for that */){
    try {
        // find if the task is there 
        const task = await Task.findById(id); // see if it is there 

        // if there is no Id return 
        if(!id){return cb(null, false)} // return 

        // if the task is there 
        if(!task){
            return cb(null, false); // there is no task return false
        }

        // now if there is a task then return them back 
        return cb(null, task); // return the task 
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// functionality - read all the tasks by the username online
async function readAllTasks(req,cb/* callback function for that */){
    try {
        // find the task in there 
        const tasks = await Task.find({username: req.user._id}); // return all the task in the 

        if(!tasks){
            return cb(null, false); // return null task since there are none
        }

        // else deposit them to the user 
        return cb(null, tasks); // returned all the tasks
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// functionality - update a task 
async function updateTask(req,id,title,description, category, status,cb/* callback function for that */){
    try {
        // check of the task is there in te db to update
        const task = await Task.findById(id);

        // it there is a task then return the errror 
        if(!task){
            return cb(null, false); // do not continue and return a message
        }

        // else continue to update the task 
        return cb(null, await Task.updateOne(
            {_id: id, username: req.user._id},
            {title: title, description: description, category: category, status: status}
        ));
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// functionality - delete a Task 
async function deleteTask(id,cb/* callback function for that */){
    try {
        // find if the task is there 
        const task = await Task.findById(id); // find the task 

        // check of the task is there 
        if(!task){
            return cb(null, false);
        }

        // else delete the task 
        return cb(null, await Task.deleteOne({_id: id}));
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// function to update status 
async function updateStatus(id,status,cb/* callback function for that */){
    try {
        // check of the task is there in te db to update
        const task = await Task.findById(id);

        // it there is a task then return the errror 
        if(!task){
            return cb(null, false); // do not continue and return a message
        }

        // else continue to update the task 
        return cb(null, await Task.updateOne(
            {_id: id},
            {status: status}
        ));
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// function to getbycategory 
async function readByCat(req,cb/* callback function for that */){
    try {
        // find the task in there 
        const tasks = await Task.find({username: req.user._id, category: req.params.category}); // return all the task in the 

        if(!tasks){
            return cb(null, false); // return null task since there are none
        }

        // else deposit them to the user 
        return cb(null, tasks); // returned all the tasks
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// filter by status 
async function readByStatus(req,cb/* callback function for that */){
    try {
        // find the task in there 
        const task = await Task.find({username: req.user._id, status: req.params.status}); // return all the task in the 

        if(!task){
            return cb(null, false); // return null task since there are none
        }

        // else deposit them to the user 
        return cb(null, task); // returned all the tasks
    } catch (error) {
        return cb(error); // throw the error 
    }
}

// now export the functions out 
exports.createTask = createTask;
exports.readTask = readTask;
exports.readAllTasks = readAllTasks;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.updateStatus = updateStatus;
exports.readByCat = readByCat;
exports.readByStatus = readByStatus;