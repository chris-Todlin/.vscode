/* This is the middleware for the book functionality  */

const { getAllBooks, getBook, addBook, updateBook, deleteBook } = require("../controller/bookFunc");


// getall the books 
async function getBooks(req,res,next){
    try {
        await getAllBooks(function(err,books){
            if(err){
                return next(err); // throw the error
            } 
            // else return the book 

            if(!books){
                return res.json("No saved Books");
            }

            console.log(books);
            return res.json(books); // return them 
        });
    } catch (error) {
        next(error);
    }
}

// function to return one book 
// /book/:id
async function getOneBook(req,res,next){
    try {
        await getBook(req.params.id,function(err,book){
            if(err){
                return next(err); // throw the error
            } 
            // else return the book 

            if(!book){
                return res.json("No book with such an ID");
            }

            return res.json(book); // return them 
        });
    } catch (error) {
        next(error);
    }
}

// fucntion to add a book 
async function newBook(req,res,next) {
    try {
        // get the form details 
        const {ISBN, title, author, genre} = req.body;

        // now set the creating on going
        await addBook(ISBN, title, author, genre, function(err,created){
            // if err
            if(err) return next(err); 

            // if there is create 
            if(!created){
                return res.json("Error in saving book");
            }

            // else return saved
            res.json("Book Created and saved");
        });
    } catch (error) {
        next(error); // thrwo away the error
    }
}

// function to update a book 
async function editBook(req,res,next) {
    try {
        // get the form details 
        const {id, title, author, genre} = req.body;
        console.log(req.body);

        // now set the updating on going
        await updateBook(id, title, author, genre, function(err,updated){
            // if err
            if(err) return next(err); 

            // if there is create 
            if(!updated){
                return res.json("Error in updating book - No such book exists");
            }

            // else return saved
            res.json("Book Updated and saved");
        });
    } catch (error) {
        next(error); // thrwo away the error
    }
}

// function to delete a book 
async function delBook(req,res,next) {
    try {
        // now delte the book
        await deleteBook(req.params.id,function(err,deleted){
            // if err
            if(err) return next(err); 

            console.log(deleted);

            // if there is create 
            if(!deleted.acknowledge){
                return res.json("Error in deleting book - No such book exists");
            }

            // else return saved
            res.json("Book deleted!");
        });
    } catch (error) {
        next(error); // thrwo away the error
    }
}

// export it out 
exports.getBooks = getBooks;
exports.getOneBook = getOneBook;
exports.newBook = newBook;
exports.editBook = editBook;
exports.delBook = delBook;