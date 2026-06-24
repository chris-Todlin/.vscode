/* Function to handle the editing of a new task */

const Todo = require("../model/todo");

async function editNewTask(req,res,next){
    const {id,todo} = req.body;

    console.log(id,todo);

    // then save it in the array
    try {
        await Todo.updateOne(
            {_id: id},
            {todo: todo}
        );
        req.flash("info","Todo Updated!")
        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

module.exports = editNewTask;