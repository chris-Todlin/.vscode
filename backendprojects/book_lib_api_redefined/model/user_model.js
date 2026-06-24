/* This is the model of the user */
const mongoose = require("mongoose");

// adding the hashing 
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10; // more would cause lagging requirest of over 123ms

// create the schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
}); // this is all for now, when we advance we can add more fields like email, profile picture, etc.

// method to get the username 
userSchema.methods.getUserName = function(){return this.username;} // hope you can see what this is 

// now before any saving hash the password 
userSchema.pre("save",async function(done){
    // decode the this on the function
    const user = this; // you look more funner to use now

    // now set the trycont
    try {
        // now check if the password is modified 
        if(!user.isModified("password")){
            return; // now my friedn
        }

        // if you are not then let's rev the engine an hash you 
        // get the salt 
        const salt = await bcrypt.genSalt(SALT_FACTOR); // oops are you done, next one
        user.password = await bcrypt.hash(user.password, salt); // I am done my guy
    } catch (error) {
        done(error); // failed master, throw the error
    }
});

// method to compare the password 
userSchema.methods.comparePassword = function(guess,done/* guess, te user guess and then done the call back */){
    bcrypt.compare(guess,this.username,function(err,isMatch){
        done(err,isMatch); // return the one suited for it
    });
}

// create the user model 
const User = mongoose.model("User", userSchema);

// export it out 
module.exports = User;