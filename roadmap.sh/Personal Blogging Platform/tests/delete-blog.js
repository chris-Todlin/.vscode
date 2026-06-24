/* 
    This is the test to check whether the delet functionality is all up and going
    It is going to delete and retun the delete blog and check if it found in th
    db
*/

async function mockDeleteBlogById(id){
    try {
        const res = await fetch(`http://localhost:3000/blog/blog-byid/${id}`, {
            method: "DELETE"
        });
        console.log("Mocking the delete request for the blog by id")
        console.log(await res.json());
        console.log("Done with the mocking of the delete request for the blog by id\n");
    } catch (error) {
        console.error(error);
    }
}

mockDeleteBlogById("6a09ad7cc3c1429ab29cd5ef");