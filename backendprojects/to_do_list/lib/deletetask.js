/* Function to delete the task incase of the delete and edit to prevent duplication of functionality */

const Todo = require("../model/todo");

// Now adding the functionality of the modngodb to delete the message

async function deleteTask(req,res,next){
    // Get the id
    const id = req.params.id;
    
    try {
       // Now apply the mongoose shortcut
        const task = await Todo.findById(id);

        // if there is no task then return 
        if(task){
            // delete the task 
            await Todo.deleteOne({_id:id});
            req.flash("info","Todo sucessfull deleted!");
            res.redirect("/"); // redirect it to the main page
        } else {
            req.flash("info","No such todo exist");
            res.redirect("/");
        }
    
    } catch (error) {
        next(error);
    }
}

module.exports = deleteTask;