const { taskAdd, setTask, setDeleted, getAllTasks, delTask, setCompleted, fullyDelTask, fullyDelAllTask, getAllDelTasks } = require("../controller/func-task");

/* Thi si the middlware for the task issues */
exports.taskRender = function(req,res){
    res.render("add"); // render the ejs file of the maim server
}

// now get all the task, 
exports.addTask = async function(req,res,next){
    try {
        // decode the name from the body 
        const {name} = req.body;

        if(name){
            await taskAdd(name,function(err,todo){
                if(err) return next(err); 

                // else check if the task is create d
                return res.json(todo ? "Task created": "Task not created");
            })
        } else {
            return res.json("No name is provided");
        }
    } catch (error) {
        next(error); // incase of an error
    }
}

// path to handle the removeALl task meaning set the deleted to true
exports.removeAllTask = async function(req,res,next){
    try {
        await setDeleted(function(err,tasks){
            if(err) return next(err);

            return res.json(tasks ? "Task updated": "Unable to Update tasks");
        })
    } catch (error) {
        next(error); // throw out the error for debugging
    }
}

// function to get all the tasks
exports.allTask = async function(req,res,next){
    try {
        await getAllTasks(function(err,todos){
            if(err) next(err);

            return res.json(todos);
        })
    } catch (error) {
        next(error); // throw out the error
    }
}

exports.removeTask = async function(req,res,next){
    try {

        const id = req.params.todo_id; // the id there for the task
        
        if(id){
            await delTask(id,function(err,task){
                if(err) return next(err);

                return res.json(task ? "Task updated": "Unable to Update task");
            });
        } else {
            return res.json("Please supply an id to choose the task you want");
        }
    } catch (error) {
        next(error); // throw out the error for debugging
    }
}

exports.updateAllTask = async function(req,res,next){
    try {
        await setCompleted(function(err,tasks){
            if(err) return next(err);

            return res.json(tasks ? "Task updated": "Unable to Update tasks");
        });
    } catch (error) {
        next(error); // throw out the error for debugging
    }
}

exports.updateTask = async function(req,res,next){
    try {

        const id = req.params.todo_id; // the id there for the task
        
        if(id){
            await setTask(id,function(err,task){
                if(err) return next(err);

                return res.json(task ? "Task updated": "Unable to Update task");
            });
        } else {
            return res.json("Please supply an id to choose the task you want");
        }
    } catch (error) {
        next(error); // throw out the error for debugging
    }
}

// function to truly delte a task 
exports.deleteTask = async function(req,res,next){
    try {

        const id = req.params.todo_id; // the id there for the task
        
        if(id){
            await fullyDelTask(id,function(err,task){
                if(err) return next(err);

                return res.json(task ? "Task deleted": "Unable to delete task");
            });
        } else {
            return res.json("Please supply an id to choose the task you want");
        }
    } catch (error) {
        next(error); // throw out the error for debugging
    }
}

// update all the tasks
exports.deleteAllTask = async function(req,res,next){
    try {
        await fullyDelAllTask(function(err,tasks){
            if(err) return next(err);

            return res.json(tasks ? "Tasks deleted": "Unable to delete tasks");
        });
    } catch (error) {
        next(error); // throw out the error for debugging
    }
}

// function to get all the deleted tasks 
exports.allDeletedTask = async function(req,res,next){
    try {
        await getAllDelTasks(function(err,todos){
            if(err) next(err);

            return res.json(todos);
        })
    } catch (error) {
        next(error); // throw out the error
    }
}


// function to get all the deleted tasks 
exports.allCompletedTask = async function(req,res,next){
    try {
        await getAllCompTasks(function(err,todos){
            if(err) next(err);

            return res.json(todos);
        })
    } catch (error) {
        next(error); // throw out the error
    }
}