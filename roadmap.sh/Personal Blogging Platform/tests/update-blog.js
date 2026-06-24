/* 
    This is the test to check whether the update functionality is all up and going
    It is going to update and return the updated blog and check if it found in the
    db
*/

async function mockUpdateBlogById(id, updateData){
    try {
        const res = await fetch(`http://localhost:3000/blog/blog-byid/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });
        console.log("Mocking the update request for the blog by id")
        console.log(await res.json());
        console.log("Done with the mocking of the update request for the blog by id\n");
    } catch (error) {
        console.error(error);
    }
}

mockUpdateBlogById("6a09adee1d9904fbdb5aa68d", { title: "Updated Title", content: "Updated Content" });