/* 
    This is the file to test the fetching of the tasks instead of depending on the unreliable
    postman or other tests which are online or much attenuation
    Leancve a comment in the title of rme to leave then well
*/

async function mockGetAllBlogs(){
    try {
        const res = await fetch("http://localhost:3000/blog/all-blogs");
        console.log("Mocking the response by the all blogs")
        console.log(await res.json());
        console.log("Done with the mocking of the response by the all blogs\n");
    } catch (error) {
        console.error(error);
    }
}

async function mockGetAllBlogsByAuthor(){
    try {
        const res = await fetch("http://localhost:3000/blog/blog-byauthor/author");
        console.log("Mocking the response by the blogs by author")
        console.log(await res.json());
        console.log("Done with the mocking of the response by the blogs by author\n");
    } catch (error) {
        console.error(error);
    }
}

async function mockGetAllBlogsByCategory(){
    try {
        const res = await fetch("http://localhost:3000/blog/blog-bycategory/category");
        console.log("Mocking the response by the blogs by category")
        console.log(await res.json());
        console.log("Done with the mocking of the response by the blogs by category\n");
    } catch (error) {
        console.error(error);
    }
}

// function to get blogs by id
async function mockGetBlogById(id){
    try {
        const res = await fetch(`http://localhost:3000/blog/blog-byid/${id}`);
        console.log("Mocking the response by the blog by id")
        console.log(await res.json());
        console.log("Done with the mocking of the response by the blog by id\n");
    } catch (error) {
        console.error(error);
    }
}

mockGetAllBlogs();
mockGetAllBlogsByAuthor();
mockGetAllBlogsByCategory();
mockGetBlogById('6a09a73bd698b02d14028a44');