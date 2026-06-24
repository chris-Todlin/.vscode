const express = require("express");
const User = require("../model/usermodel");
const Task = require("../model/taskmode");

// The router application
const router = express.Router();

// function to ensure auther
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash("info", "You must login to see this page");
        return res.redirect("/");
    }
}

// Sett it a a must api
router.use(ensureAuthenticated);

// The main page
router.get("/",async(req,res,next)=>{
    // get the username
    const userName = req.user;
    
    // Get the all list of task per the username
    try {
        const tasks = await Task.find({username: req.user.id});
        res.render("index",{tasks: tasks});
    } catch(err){next(err);}
});

// Adding a task to the database
router.get("/addtask",(req,res)=>{
    res.render("addtask"); // The view for the addtaskForm
});

router.post("/addtask",async(req,res,next)=>{
    // GEt the data fom the form
    const {title, description, status} = req.body;

    // Fond one, if there sed them back 
    try{
       const user = await User.findOne({username: req.user.username}); // Find the user

       // If ther user is alread there
       if(!user) {
        req.flash("error","No such username. Please login or sign up to save notes.");
        return res.redirect("/addtask");
       }

       // If my dear is there, then save the task 
       const newTask = await Task.create({
        username: req.user._id,
        title: title.trim(),
        description: description.trim(),
        status: status
       });

       res.redirect("/taskapp/"); // back to the main views
    } catch(err){
        next(err);
    }
});

// Now update a task 
router.get("/edittask/:id",async(req,res)=>{
    try {
        const task = await Task.findOne({_id: req.params.id});

        if(!task) {
            req.flash("error","No such task in the databases");
            return res.redirect("/taskapp/");
        }

        res.render("edittask",{task: task})
    } catch (error) {
        next(err);
    }
});

router.post("/edittask", async (req,res,next) => {
    const {id,title, description, status} = req.body;
    const updateDate = new Date();

    try {
        const task = await Task.findById(id);

        if(!task) {
            req.flash("error","No such task in the databases");
            return res.redirect("/taskapp/");
        }
        const updatedTask = await Task.updateOne(
            {_id: id, username: req.user._id}, // find using this
            {title: title.trim(), description: description.trim(), status: status, updatedAt: updateDate}, // ones to update
            {new: true}
        );

        if(!updatedTask) {
            req.flash("error","No task by that user id or there was an unexpected error!");
            return res.redirect(`/edittask/${id}`);
        }

        req.flash("info","task updated!");
        res.redirect(`/taskapp/`);
    } catch(err){
        next(err);
    }
});

router.post("/filtertask",async(req,res,next)=>{
    try {
        const {filterParam} = req.body;
        let tasks = await Task.find({username: req.user.id});
        console.log(tasks);
        conso
        tasks = tasks.filter((el)=> el.status === filterParam);
        console.log(tasks);
        
        res.json(tasks);
    } catch (error) {
        req.flash("error","There was an error");
        next(err);
    }
});

router.get("/deletetask/:id",async(req,res,next)=>{
    try {
        const deletedTask = await Task.findOneAndDelete({_id: req.params.id, username: req.user.id});

        if(!deletedTask) {
            req.flash("error","Error in deleteing task");
            return res.redirect(`/taskapp/`);
        }

        req.flash("info","Task deleted sucessfully");
        res.redirect(`/taskapp/`);
    } catch (err) {
        next(err);
    }
});

router.get("/deletealltasks",async(req,res,next)=>{
    try {
        const deletedAll = await Task.deleteMany({});

        req.flash("info","Deleted all tasks sucessfully");
        res.redirect(`/taskapp/`);
    } catch (error) {
        req.flash("error","Error in deleting  all tasks")
        next(err); 
    }
})

module.exports = router;