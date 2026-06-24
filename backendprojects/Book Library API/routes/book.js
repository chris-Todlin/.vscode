/* This is the router w=itht he book fuctionality */

const express = require("express");
const { getBooks, getOneBook, newBook, editBook, delBook } = require("../middleware/bookMiddleware");
const { Auth } = require("../middleware/auth");

// start the router
const router = express.Router();

// esnure auth 
//router.use(Auth); // ensure is auth

// path to get all the task 
router.get("/books",/* function middleware */getBooks); // get all the books

// now get one book 
router
    .route("/:id")
    .get(getOneBook) // return one book
    .delete(delBook); // delete the book

// create new book 
router
    .route("/")
    .post(newBook) // create the new book
    .put(editBook) // edit one book
    .get((req,res)=> res.render("index")); // the index ejs for the book

// when edit, get the index and edit the form of the add task using js on the front end

// export it out 
exports.router = router;