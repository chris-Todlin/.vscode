const users = []; // Store the users

// function to check if the user is there and push him in
function addUser(res,username, password){
    if(!users.find(el=> el.username === username)){
        users.push({username: username, password: password}); // create him
    }
}
module.exports = users;
module.exports.addUser = addUser;