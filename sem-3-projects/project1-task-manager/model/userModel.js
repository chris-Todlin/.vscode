/* 
    This is the model of the user. It has the following in its tails
        -> Username 
        -> Password - encoded with bcrypt
        -> Bio or story 
        -> Date created or arrived in the db
*/

// The depenedcies
const bcrypt = require("bcrypt"), 
mongoose = require("mongoose"),
SALT_FACTOR = 10;

// create the user schema 
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: String, 
    createdAt: {type: Date, default: Date.now}
});

// the action to perfom before anything else
userSchema.pre("save", async function(done){
    const user = this; 

    // check if the password is modified
    if(!user.isModified("password")) return;

    // Otherwise
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
});

// now the method to check if the password is right 
userSchema.methods.checkPassword = function(guess, done){
    bcrypt.compare(guess, this.password, function(err,isMatch){
        done(err, isMatch);
    });
};

// create the model and export it
const User = mongoose.model("User", userSchema);
module.exports = User; 