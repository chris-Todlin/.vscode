/* 
    - This is the usermodel of the application
    - A password and a username 
    - Password is also hashed here and saved
*/

/* Modules neeede */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

// create the userSchema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true} // required to be saved else throw and error
});

// a method to return the username
userSchema.methods.name = function(){return this.username};

// a method to encrypt the password 
userSchema.pre("save",async function(done){
    const user = this; // give it a more meaningful name

    try {
        // check of the password is not modified
        if(!user.isModified("password")){
            return;
        }

        // create the salt
        const salt = await bcrypt.genSalt(SALT_FACTOR);

        // now do the ting
        user.password = await bcrypt.hash(user.password,salt); // done

    } catch (error) {
        done(error); // throw the error out
    }
});

// now a method to compare the passwords
userSchema.methods.CheckPassword = async function(guess,done){
    bcrypt.compare(guess,this.password,function(err,isMatch){
        done(err,isMatch);
    });
};

// create the model
const User = mongoose.model("User",userSchema);

/* export */
module.exports = User;