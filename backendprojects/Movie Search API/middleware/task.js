/* This is the dedicated middleware for the task details and activities */

const { saveTask } = require("../controller/task");

// middleware to save the task 
async function newTask(req,res,next){
    // get the form details 
    const {title, description, category} = req.body;

    try {
        const task = await saveTask(req.user._id, title, description, category); // the function to do so 

        if(task){
            res.json({message: "saved"});
        } else {
            res.json({message: "unable to save"}); // did not do it
        }
    } catch (error) {
        next(error); // crashed 
    }

}