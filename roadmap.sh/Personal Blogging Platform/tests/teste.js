/* 
    This function s used to mock data and send it to the variable server for testing and all that
    Welcom and ditch it in
*/

const superagent = require("superagent");
async function mockCreateBlog(){
    try {
        const res = await fetch("http://localhost:3000/blog/add-blog",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                title: "title",
                                    content: "content",
                                    author: "author",
                                    category: "category"
            })
        });
        console.log(await res.json());
    } catch (error) {
        console.error(error);
    }
}

mockCreateBlog(); // trial one