const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const SALT_FACTOR = 10;

// setupt the schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// return the username 
userSchema.methods.name = function(){ 
    return this.username ;
}

userSchema.pre("save", async function(next){
    const user = this;

    if(!user.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(SALT_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
});

// Check password
userSchema.methods.checkPassword = function(guess,done){
    bcrypt.compare(guess,this.password,function(err,isMatch){
        done(err, isMatch);
    });
};

// Save it under a Model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;