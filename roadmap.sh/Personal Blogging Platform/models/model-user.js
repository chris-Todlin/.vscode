// Example User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['user', 'author', 'admin'], default: 'user' }
});
