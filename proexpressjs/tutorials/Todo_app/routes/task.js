/* The routes to deal with the tasks */
exports.list = async function(req,res,next){
    await req.db.tasks.find({
        completed: false
    }).toArray(function(err,tasks){
        if(err) return next(err);

        res.render('task',{
            title: 'Todo List',
            tasks: tasks || []
        });
    });
};

// function to add the task 
exports.add = async function(req,res,next) {
    if(!req.body || !req.body.name){
        return next(new Error('No data provided.'));
    }

    await req.db.tasks.save({
        name: req.body.name, 
        completed: false
    },function(error, task){
        if(error) return next(error);
        if(!task) return next(new Error("Failed to save"));
        console.info('Added %s with id=%s', task.name, task._id);

        // redirect the user 
        res.redirect("/tasks");
    })
};

// marl all the task s as completed
exports.markAllCompleted = function(req,res,next){
    if(!req.bod.all_done || req.body.all_done !== true) return next();

    // perfoma a multi 
    req.db.tasks.update(
        {completed: false},
        {$set: {
            completed: true
        }},
        {multi: true},function(error,count){
            if(error) return next(error);

            console.info('Marked %s task(s) completed.', count);
            res.redirect('/tasks');
        }
    )
}

// for the completed ones
exports.completed = function(req,res,next){
    req.db.tasks.find({completed: true})
                .toArray(function(error,tasks){
                    res.rendeR('tasks_completed',{
                        title: 'Completed',
                        tasks: tasks || []
                    });
                });
}

// function to markComplete
exports.markComplete = function(req,res,next){
    if(!req.body.completed){
        return next(new Error('Parama is missing'));
    }

    req.db.tasks.updateBId(req.task_id,
        {$set: {completed: req.body.completed === 'true'}},
        function (err, count){
            if(err) return next(err);
            if(count !==1) return next(new Error('Something went wrong.'));

            console.info('Marked task %s with id=%s completed.',req.task.name,req.task._id);
            res.redirect('/tasks');
        }
    );
}

// delete all the task 
exports.del = function(req,res,next){
    req.db.tasks.removeByid(req.task._id, function(err, count){
        if(err) return next(err);
        if(count !== 1) return next(new Error("Something went wrong."));

        console.info('Deleted task %s with id=%s completed.',req.task.name,req.task._id);
        res.status(204).send();
    })
}