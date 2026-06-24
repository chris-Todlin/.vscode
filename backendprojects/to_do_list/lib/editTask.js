/* Function to delete the task incase of the delete and edit to prevent duplication of functionality */

const Todo = require("../model/todo");

async function editTask(req,res,next){
    // if the task is in the db
    const id = req.params.id;
    
    try {
        // tr to find the index
        const task = await Todo.findById(id);
        if(task){
            // Can use the falsh messages since it is a redirect
            res.render("edit",{
                task: task
            });
        } else {
            req.flash("info","No such todos");
            res.redirect("/");
        }
    
    } catch (error) {
        next(error);
    }
}

module.exports = editTask;