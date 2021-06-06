import { Schema, model } from 'mongoose';
import User from '../interfaces/User.interface';

const userSchema = new Schema<User>({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Posts',
  }],
});

const userModel = model<User>('Users', userSchema);

export default userModel;
