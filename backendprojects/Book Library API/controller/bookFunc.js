/* This is the funtion to handle all the functionality involved with the book  - anthing */
/* Modules required */
const { Book }= require("../model/bookModel");

// functionality - add a book 
async function addBook(ISBN,title, author, genre, cb){
    try {
        return cb(null,await Book.create({
            ISBN: ISBN,
            title: title,
            author: author,
            genre: genre
        }));// task has beeen created
    } catch (error) {
        console.error(error); // console the errror
        return cb(new Error ("Error in creating the book"));
    }
}

// functionalit - view all the books 
async function getAllBooks(cb/* call back incase of error in getting th ebooks */) {
    // get all the books - no much talk 
    try {
        return cb(null, await Book.find()); // return all of them 
    } catch (error) {
        cb(error);
    }
}

// functionality - get one book 
async function getBook(id/* a must or the other */,cb/* call back incase of error in getting th ebooks */) {
    // get all the books - no much talk 
    try {
        if(!id){
            return; // no business  here
        }
        return cb(null,await Book.findById(id)); // return the book by the given Id
    } catch (error) {
        cb(error);
    }
}

// functionality - update a book 
async function updateBook(id,title, author, genre, cb){
    try {
        // findd of the bood is there 
        const book = await Book.findById(id); // find by the usernmae 

        if(book){
            // update the book 
            return cb(null,await Book.updateOne(
                {_id: id},
                {title: title, author: author, genre: genre, updatedAt: Date.now()}
            ));
        }

        // elser 
        return cb(null, false);
    } catch (error) {
        return cb(new Error("Error in updating book"));
    }
}

// functionality - update a book 
async function deleteBook(id, cb){
    try {
        // findd of the bood is there 
        const book = await Book.findById(id); // find by the usernmae 

        if(book){
            // update the book 
            return cb(null,await Book.deleteOne({_id: id})); // delte by id
        }

        // elser 
        return cb(null, false);
    } catch (error) {
        return cb(new Error("Error in deleting book"));
    }
}

// case use addBook(1212121, "erere", "mwakai", "fiction",function(err,book))

// export them out 
exports.updateBook = updateBook;
exports.getAllBooks = getAllBooks;
exports.getBook = getBook;
exports.deleteBook = deleteBook;
exports.addBook = addBook;