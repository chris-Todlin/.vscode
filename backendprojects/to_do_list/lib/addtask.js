/* Function to add the task incase of the edit and add task in the array */
const Todo = require("../model/todo");

// now we are adding the use of the mongodb to add the task in the additon of the task
async function addNewTask(req,res,next){
    const {todo} = req.body;

    if(!req.user){
        req.flash("info","You need to signup to save the todo");
        return res.redirect("/signup");
    }

    // then save it in the array
    try {
        await Todo.create({
            username: req.user._id,
            todo: todo
        });
        res.redirect("/"); // render the todos page
    } catch (error) {
        next(error);
    }
}

// moving to the new database to add the todos

module.exports = addNewTask;