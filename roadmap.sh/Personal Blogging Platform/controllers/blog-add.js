/* 
    This is the code to create the model of the blog and then add it.
    It would have to make a call to the db, then create the blog.
    In case of an erro it would return it back to the user for handling
    Its main purpuse is to create not error handling

    After creating, it returns a message of the created blog as confirmation it is created

    We have to import the Blog
*/

const {Blog} = require("../models/model-blog"); // the module to play around with 
const {db} = require("../config/sqlitedb"); // the db to play around with it

// this function sole purpose it create the blog and all its properties
// async help in the promises createing and rewards
module.exports.CreateBlog = async function(/* the detailf of the task so pass in teh res instad of putting the show for every one */res,next) {
    try {
        const {title, content,author, category} = res.body; // extrack the data from the there

        // create teh blog with assumption that all the data is fine
        const blog = await Blog.create({
            title: title,
            content: content,
            author: author,
            category: category
        });

        // for the path of the sqlte inside there in
        db.run(`INSERT INTO blogs (title, content, author, category) 
            VALUES (?,?,?,?)`,[title, content, author, category],function(err){
                if(err) next(err);
                else console.log("Blog added to SQLite database with ID:", this.lastID);
            })

        // return the blofg object
        console.log(blog); // to confirm what it is
        return blog;
    } catch (error) {
        console.error(error);
    }
}