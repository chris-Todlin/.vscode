/* Function to delete the data */
/* This is the function to edit the task of the user in an case to control that action */

const Task = require("../model/taskmodel"); // the model

async function deleteTask(req,res,next){

    // then the trycatch 
    try {
        // now update the task before anthing and save them in there
        const taskToUpdate = await Task.findById(req.params.id);

        if(taskToUpdate){
            // now update the task 
            await Task.deleteOne({_id: req.params.id});

            // then redirect to the main page of the tasks
            res.redirect(`/task/tasks`);
        } else {
            req.flash("info","Unable to find and delete the task");
            res.redirect("/task/tasks");
        }
    } catch (error) {
        next(error); // catch all the errors in there
    }
}

// export the function out for use
module.exports = deleteTask;