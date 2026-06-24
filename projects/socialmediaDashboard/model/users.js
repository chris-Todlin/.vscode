const users = []; // All the users
const User = require('./usernamemodel');
const userModel = require('./usernamemodel');


//function to add new user
function checkUser(user, password){
    if(users.map(el=> el.name).includes(user)){
        //check the password if it is the same
        const userIndex = users.map(el=> el.name).indexOf(user);
        return (users[userIndex].password === password) ? "Logged in"  : "Incorrect Password";
    }

    return "User Does not exist";
}

// function to add use
function addUser(user, password){
    if(!users.map(el=> el.name).includes(user)) {
        users.push(new User(user,password));
    } 
}

module.exports.checkUser = checkUser;
module.exports.addUser = addUser;