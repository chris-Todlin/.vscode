const postAll = require('./post');

// function to dave the posts
function savePost(username,title, content){
    postAll.posts.push(new postAll.Post(username,title, content));
}

// Function retrieve the function for a certain username
function returnPosts(username){
    // Filter
    const postUser = postAll.posts.filter(post => post.username === username);

    if(postUser.length >= 1){
        return postUser;
    } else {
        return null;
    }
};

module.exports.savePost = savePost;
module.exports.returnPosts = returnPosts;