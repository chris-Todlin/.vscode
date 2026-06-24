/* The Model for the user who are using the application */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

// Now create the userSchema
/* 
    We have the 
        password and the username
*/
const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required: true}
});

/* GEt the username */
userSchema.methods.name = ()=>{
    return this.username;
}
/* Before saving, encry the password so as not to be a simple one that if hacker can be easil infered to  */
userSchema.pre("save",async function(done){
    const user = this;

    if(!user.isModified("password")){
        return;
    }

    try {
        const salt = await bcrypt.genSalt(SALT_FACTOR);
        user.password = await bcrypt.hash(user.password, salt); // save directly
    } catch (error) {
        done(err);
    }
});

/* Compare the password */
userSchema.methods.checkPassword = async function(guess,done) {
    try {
        bcrypt.compare(guess, this.password,function(err,isMatch){
            done(err,isMatch);
        });
    } catch (error) {
        done(error); // catch errors incase
    }
};

/* Export the model for use by other modules */
const User = mongoose.model("User",userSchema);
module.exports = User;