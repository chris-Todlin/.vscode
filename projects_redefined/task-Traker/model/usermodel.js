const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALF_FACTOR = 10;

// now define the model of the task then user
const userSchema = new mongoose.Schema({
    username: {type: String,unique: true, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

userSchema.methods.name = function(){
    return this.username;
}

// Presave function where the password id hashed before
userSchema.pre("save",async function(next){
    const user = this;

    if(!user.isModified("password")){
        return;
    }

    const salt = await bcrypt.genSalt(SALF_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
})

// To compare the password
userSchema.methods.checkPassword = function(guess,next){
    bcrypt.compare(guess, this.password,function(err,isMatch){
        next(err, isMatch); // check
    })
}

// Getting the model done
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;