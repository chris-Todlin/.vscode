/* This is the function to add the task of the user in an case to control that action */

const Task = require("../model/taskmodel"); // the model

async function addTask(req,res,next){
    // first get the form detail and see them out
    const {title, description, category} = req.body; // there you go 

    // then the trycatch 
    try {
        // now create the task
        await Task.create({
            username: req.user._id,
            title: title,
            description: description,
            category: category
        });

        // then redirect to the main page of the tasks
        res.redirect("/tasks");
    } catch (error) {
        next(error); // catch all the errors in there
    }
}

// export the function out for use
module.exports = addTask;