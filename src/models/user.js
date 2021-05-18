import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

const User = model('User', userSchema);

export default User;
