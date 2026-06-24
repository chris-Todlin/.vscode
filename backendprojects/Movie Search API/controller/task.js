/* This is the controller for all the shit you shit on */

const { Task } = require("../model/task");

// function to save the save task 
async function saveTask(user, title, description, category){
    try {
        // save that shit 
        return await Task.create({
            username: user,
            title: title, 
            description: description,
            category: category,
            createdAt: new Date.toString()
        });
    } catch (error) {
        console.error(error.stack);
    }
}

// export the function
exports.saveTask = saveTask;