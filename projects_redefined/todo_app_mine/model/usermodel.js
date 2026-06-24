/* 
    This is the user model
    - It has the username and the password
    - Bcrypt is used to hash the password for storage to prevent the ohter guy from seeing it
    - Mongoose is used to create the model and acces the database, MMngdoDB
    - There is a comprepassword function somewhere along the wire
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

// the schemao fhte user 
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String,required: true},
    createdAt: {type: String, default: Date.now}
});

// a method to get the username
userSchema.methods.getUsername = function(){return this.username;}

// function to pre modify the passowrd
userSchema.pre("save", async function(done){
    try {
        const user = this; 

        if(!user.isModified("username")) return;

        // hash ans get the password right
        const salt = await bcrypt.genSalt(SALT_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        done(error); // throw the error out
    }
});

// now compare the pass
userSchema.methods.comparePassword = function(guess,done){
    bcrypt.compare(guess, this.password, function(err,isMatch){
        done(err,isMatch);
    });
}

// now export out the model 
module.exports.user = mongoose.model("User", userSchema);