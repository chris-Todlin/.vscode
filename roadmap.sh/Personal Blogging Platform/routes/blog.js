/* 
    This is the main entr to any blog request
    It handle all of them in one

    // we use the express and it as the main for the testing part then added in 
        in the main program after it gian an intriduction into the device
*/

const express = require("express");
const {createBlog} = require("../middleware/addblog");
const fetchBlog = require("../middleware/fetch-blog"); // for the fetch functionalities
const {deleteBlog} = require("../middleware/deleteblog");
const {updateBlog} = require("../middleware/updateblog")

// creat ethe router 
const router = express.Router(); // we would replace it with the expres.Router()

// set the path for the creating a blog
router.post("/add-blog", createBlog);

// set the path for fetch all the blogs
router.get("/all-blogs", fetchBlog.fetchBlogs); 

// one to get all the one by author then category
router.get("/blog-byauthor/:author", fetchBlog.fetchBlogsByAuthor); // by the required author
router.get("/blog-bycategory/:category", fetchBlog.fetchBlogsByCategory); // by the required category

// cleanign aup abit these thing
router.route("/blog-byid/:id")
    .get(fetchBlog.fetchBlogById)
    .put(updateBlog)
    .delete(deleteBlog);

// path to delete by Id
router.delete("/blog-byid/:id", deleteBlog); // by the required id

module.exports.router = router;