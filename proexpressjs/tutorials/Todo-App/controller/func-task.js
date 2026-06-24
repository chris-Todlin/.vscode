const { Todo } = require("../model/model-task");

/* Cnotrolling the functionality of the todo */
exports.taskAdd = async function(nameTodo, cb/* callback to return the created or not */) {
    try {
        const todo = await Todo.create({name: nameTodo});

        return cb(null, todo || false);
    } catch (error) {
        return cb(error); // creturn the error using the callback
    }
}

// function to set the deleted to true
exports.setDeleted = async function(cb){
    try {
        await Todo.updateMany(
            {deleted: false}, //filter with this one - all that are false
            {$set: {deleted: true}}, function(err, count){
                if(err) return cb(err);

                return cb(null, count || false);
            }
        )
    } catch (error) {
        return cb(error); // return the error that happended
    }
}

// function to get all the task s
exports.getAllTasks = async function(cb){
    try {
        const tasks = await Todo.find({deleted: false}); // return all of them without the delete

        return cb(null, tasks || []);
    } catch (error) {
        cb(error); // error
    }
}

// function to update the task to theo one we need
exports.delTask = async function(id,cb) {
    try {
        const todo = await Todo.findById(id);

        if(todo){
            const uptTodo = await Todo.updateOne(
                {_id: id},
                {deleted: true}
            );

            return cb(null, uptTodo || false);
        }
    } catch (error) {
        cb(error);
    }
}

// function to set the copletd to true
exports.setCompleted = async function(cb){
    try {
        await Todo.updateMany(
            {completed: false}, //filter with this one - all that are false
            {$set: {completed: true}}, function(err, count){
                if(err) return cb(err);

                return cb(null, count || false);
            }
        )
    } catch (error) {
        return cb(error); // return the error that happended
    }
}

exports.setTask = async function(id,cb) {
    try {
        const todo = await Todo.findById(id);

        if(todo){
            const uptTodo = await Todo.updateOne(
                {_id: id},
                {completed: true}
            );

            return cb(null, uptTodo || false);
        }
    } catch (error) {
        cb(error);
    }
}

exports.fullyDelTask = async function(id,cb) {
    try {
        const todo = await Todo.findById(id);

        if(todo){
            const delTodo = await Todo.deleteOne({_id: id});

            return cb(null, delTodo || false);
        }
    } catch (error) {
        cb(error);
    }
}

// function to delete al the tasks fully
exports.fullyDelAllTask = async function(cb) {
    try {
        const delTodo = await Todo.deleteMany({deleted: true}); // delete who all the delete are true

        return cb(null, delTodo || false);
    } catch (error) {
        cb(error);
    }
}

// function to get all the deleted task s
exports.getAllDelTasks = async function(cb){
    try {
        const tasks = await Todo.find({deleted: true}); // return all of them without the delete

        return cb(null, tasks || []);
    } catch (error) {
        cb(error); // error
    }
}

// function to get all the deleted task s
exports.getAllCompTasks = async function(cb){
    try {
        const tasks = await Todo.find({deleted: false, completed: true}); // return all of them without the delete

        return cb(null, tasks || []);
    } catch (error) {
        cb(error); // error
    }
}