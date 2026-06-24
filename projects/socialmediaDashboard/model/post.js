const posts = [];// To save the post

class Post {
    constructor(username, title, content){
        this.username = username;
        this.title = title;
        this.content = `<pre>${content}</pre>`;
    }
}

module.exports.posts = posts;
module.exports.Post = Post;