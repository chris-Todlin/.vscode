const express = require("express");
const expenseModel = require("../model/expenseModel");
const UserModel = require("../model/userModel");
const { ensureAuthenticated } = require("../middleware/authenticate");
const multer = require("multer");
const path = require("path");
const {parse, stringify, transform, generate} = require("csv");
const fs = require("fs");
const {pipeline} = require("stream/promises");
const { error } = require("console");
let fileNumber = 0;

const router = express.Router();

// disk storage 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve(__dirname, "../upload"))
    },
    filename: function(req,file,cb){
        const suffix = Date.now();
        cb(null, file.fieldname + "-" + fileNumber + ".csv");
    }
});

// the upload functionlit
const upload = multer({storage: storage});

//must use api
router.use(ensureAuthenticated);

// Handle the main landing page for the express tracker aplication
router.get("/",async(req,res)=>{
    try {
        const expenses = await expenseModel.find({username: req.user.id});

        const total = expenses.map(el=> el.amount).reduce((pre,current)=> pre + current,0);
        res.render("index",{
            expenses: expenses,
            total: total,
            id: req.user.id
        });
    } catch (error) {
        next(err);
    }
});

router.get("/addexpense",(req,res)=>{
    res.render("addexpense");
});

router.post("/addexpense",async(req,res,next)=>{
    const {description, amount} = req.body;


    // Check of the amount is negative or positvive to change it
    if(Number(amount) === NaN || Number(amount) <= 0){
        req.flash("info","Amount entered has some problems");
        return res.redirect("/expense/addexpense");
    }

    try {
        const user = UserModel.findOne({username:req.user.username});

        if(!user){
            req.flash("info","Login or Sign up to add expense!");
            return res.redirect("/");
        }

        await expenseModel.create({
            username: req.user._id,
            description: description.trim(),
            amount: Number(amount)
        });

        res.redirect("/expense/");
    } catch (error) {
        next(error);
    }
});

// Path to post a csv file 
router.get("/upload-csv",(req,res)=>{
    res.render("csv");
});

router.post("/upload-csv",upload.single("csv_file"),async(req,res,next)=>{
    // read the csv file
    const file = path.resolve(__dirname, `../upload/csv_file-${fileNumber}.csv`);
    try {
        const parser = fs.createReadStream(file)
                    .pipe(parse({
                        columns: true,
                        skip_empty_lines: true, 
                        trim: true,
                        relax_column_count: true
                    }))
                    .on("data",async(row)=>{
                        await expenseModel.create({
                            username: req.user._id,
                            description: row.Description,
                            amount: row.Amount
                        });
                    })
                    .on("end", ()=>{
                        console.log("Finished uploading");
                    });

        req.flash("info","Uploaded sucessfully");
        res.redirect("/expense/")
    } catch (error) {
        next(err);
    }

    // after getting done add b one
    fileNumber++;
});

router.get("/download-expenses/:id", async(req,res,next)=>{
    try {
        res.setHeader("Content-Disposition", "attachment; filename=expense.csv");
        res.setHeader("content-Type", "text/csv");

        // The columns of the csv
        const columns = ['Description','Amount'];
        const stringifier = stringify({header: true, columns: columns});

        const cursor = expenseModel.find({username: req.params.id}).cursor();
        
        await pipeline(
            async function* () {
                for await (const doc of cursor){
                    yield {Description: doc.description, Amount: doc.amount};
                }
            },
            stringifier,
            res
        );
    } catch (error) {
        next(error);
    }
});

//edit task
router.get("/edit/:id",async(req,res,next)=>{

    try {
        const expense = await expenseModel.findById(req.params.id);

        if(!expense) {
            req.flash("info","No such Task!");
            return res.redirect("/expense/");
        }

        res.render("edittask",{
            expense: expense
        });
    } catch (error) {
        next(error);
    }
});

// Update task
router.post("/addexpense",async(req,res,next)=>{
    const {id,description, amount} = req.body;


    // Check of the amount is negative or positvive to change it
    if(Number(amount) === NaN || Number(amount) <= 0){
        req.flash("info","Amount entered has some problems");
        return res.redirect(`/expense/edit/${id}`);
    }

    try {
        const user = await UserModel.findOne({username:req.user.username});

        if(!user){
            req.flash("info","Login or Sign up to add expense!");
            return res.redirect("/");
        }

        const updatedExpense = await expenseModel.updateOne(
            {_id: id, username: req.user._id},
            {description: description, amount:amount},
            {new: true}
        );

        if(!updatedExpense){
            req.flash("error","No expense by that name, update failed");
            return res.redirect(`/edit/${id}`);
        }
        req.flash("info", "Task updated sucessfully!");
        res.redirect("/expense/");
    } catch (error) {
        next(error);
    }
});

// delete Task
router.get("/delete/:id",async(req,res,next)=>{

    try {
        const expense = await expenseModel.findById(req.params.id);

        if(!expense) {
            req.flash("info","No such Task!");
            return res.redirect("/expense/");
        }

        const deleteExpense = await expenseModel.deleteOne({_id: req.params.id});

        if(!deleteExpense) {
            req.flash("error","Error in deleting task");
            return res.redirect("/expense/");
        }

        res.redirect("/expense/");
    } catch (error) {
        next(error);
    }
});

module.exports = router;