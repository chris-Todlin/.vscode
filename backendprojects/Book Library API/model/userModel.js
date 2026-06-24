// this is the model to create the user for al the deal that are there

// the models to use here
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const SALT_FACTOR = 10; // number of salats

// create the schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: String, default: Date.now()}
});

// we could athor details but lets stop at this 

// get the mwthod to get the username 
userSchema.methods.getUsername = function(){return this.username} // done 

// now hash the password before you save it 
userSchema.pre("save", async function(next){
    try {
        const user = this;
        // check of the username if modified

        if(!user.isModified("password")){
            return; // don't do anything
        }

        // now hash the password 
        const salt = await bcrypt.genSalt(SALT_FACTOR);

        // save the hashed password 
        user.password = await bcrypt.hash(user.password, salt); // done 
    } catch (error) {
        next(error); // throw out an error
    }
});

// function to compare the passwords 
userSchema.methods.comparePassword = function(guess, next){
    bcrypt.compare(guess, this.password, function(err, isMatch){
        next(err,isMatch);
    });
};

// now create the model of the user 
const User = mongoose.model("User",userSchema);

// export it ourt for use 
exports.User = User; // done