/* This is the model of the user */
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const SALT_FACTOR = 10;

// Create the user schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type:String, required: true}
});

// function to get the username
userSchema.methods.getUsername = function(){ return this.username;}

// function to hash it
userSchema.pre("save",async function(next){
    try {
        const user = this;

        if(!user.isModified("password")){
            return;
        }

        // generate the salt
        const salt = await bcrypt.genSalt(SALT_FACTOR);

        // hash the password
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        next(error);
    }
});

// method to compare the password
userSchema.methods.comparePassword = async function(guess, next){
    bcrypt.compare(guess, this.password, function(err,isMatch){
        next(err,isMatch);
    });
};

// create the model
const User = mongoose.model("user", userSchema);

// export the model
module.exports = User;