/* import the users */
const usersAll = require('./userdata');

// function to check if the users is there and if not create and return the username
function checkUser(newUser){
    if(!usersAll.includes(newUser)) {
        usersAll.push(newUser); // Save the user or return the user
    }

    // return the user
    return usersAll.find(user=> user === newUser); // return
}

module.exports.checkUser = checkUser;