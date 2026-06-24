/* 
    This is the function and file to handle the conplex part of fetching the blogs
    from the database and sending them to the user in the client side.
    Since it is a blog, no personalozation neede, it returs all of the logs in the db.
    We use a simple fetch path from the mongoose model
*/
const {Blog} = require("../models/model-blog"); // the module to play around with 
const {db} = require("../config/sqlitedb"); // the db to play around with it

// function is here to go to the hell 
module.exports.getAllBlogs = async function(next){
    try {
        const blogs = await Blog.find(); // return all of them
        const blogsSqlite = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM blogs", (err, rows) => {
                if (err) {  reject(err); // Handle the error
                } else { 
                    resolve(rows); // Resolve with the retrieved rows  
                }});          
            }); 
        return {
            mongooseBlogs: blogs, // the blogs from mongoose
            sqliteBlogs: blogsSqlite // the blogs from sqlite
        }; // done here 
    } catch (error) {
        next(error); // Pass the error to the next middleware function
    }
}

// now another depending on the category selected by the ser
module.exports.getAllBLogsByCategory = async function(category,next){
    try {
        const blogs = await Blog.find({category: category}); // return all of them
        const blogsSqlite = await new Promise((resolve,reject)=>{
            db.all("SELECT * FROM blogs WHERE category = ?", [category],(err,rows)=>{
                if(rows) resolve(rows);
                else reject(err); // done all is good
            });
        });
        return {
            mongooseBlogs: blogs,
            sqliteBlogs: blogsSqlite
        }; // done here 
    } catch (error) {
        next(error); // Pass the error to the next middleware function
    }
}

// now return depending on the author of the blog
module.exports.getAllBLogsByAuthor = async function(author,next){
    try {
        const blogs = await Blog.find({author: author}); // return all of them
        const blogsSqlite = await new Promise((resolve, reject)=>{
            db.all("SELECT * FROM blogs WHERE author = ?",[author],(err,rows)=>{
                if(rows) resolve(rows);
                else reject(err);
            });
        });
        return {
            mongooseBlogs: blogs, // the blogs from mongoose
            sqliteBlogs: blogsSqlite // the blogs from sqlite
        }; // done here 
    } catch (error) {
        next(error); // Pass the error to the next middleware function
    }
}

// fethcing a single blog by the id
module.exports.getBlogById = async function(id, next){
    try {
        const idSqlite = 1; // since the is for the re.params is mongos db one
        const blog = await Blog.findById(id); // return the blog with the specified id
        const blogSqlite = await new Promise((resolve,reject)=>{
            db.get("SELECT * FROM blogs WHERE id = ?",[idSqlite],(err,rows)=>{
                if(rows) resolve(rows);
                else reject(err);
            })
        })
        return {
            mongooseBlog: blog,
            sqliteBlog: blogSqlite
        }; // done here 
    } catch (error) {
        next(error); // Pass the error to the next middleware function
    }
}
