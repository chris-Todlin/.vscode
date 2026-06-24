/* This is the function to edit the task of the user in an case to control that action */

const Task = require("../model/taskmodel"); // the model

async function editTask(req,res,next){
    // first get the form detail and see them out
    const {id,title, description, category} = req.body; // there you go 

    // then the trycatch 
    try {
        // now update the task before anthing and save them in there
        const taskToUpdate = await Task.findById(id);

        if(taskToUpdate){
            // now update the task 
            await Task.updateOne(
                {_id: id, username: req.user._id},
                {title: title, description: description, category: category}
            );

            // then redirect to the main page of the tasks
            res.redirect(`/task/viewtask/${id}`);
        } else {
            req.flash("info","Unable to find and update the task");
            res.redirect("/task/tasks");
        }
    } catch (error) {
        next(error); // catch all the errors in there
    }
}

// export the function out for use
module.exports = editTask;