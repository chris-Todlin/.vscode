/* This is a function to save the user in the login and signup forming */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

// now create the schema of the user
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// now before doing anything encrpypt the password
userSchema.pre("save",async function(next){
    const user = this; // this is the reerence object

    if(!user.isModified("password")){s
        return; // end it since the password has been modified
    }

    try {
        // now hash the password
        const salt = await bcrypt.genSalt(SALT_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);


    } catch (error) {
        done(error);
    }
});

// now a method to get the username
userSchema.methods.getUserName = function(){ return this.username;}

// Function to compare passwords
userSchema.methods.comparePassword = async function(guess,next){
    bcrypt.compare(guess, this.password,function(err,isMatch){
        next(err,isMatch);
    });
};

// now save the model 
const User = mongoose.model("User", userSchema);

// export the model 
module.exports = User;