import { Types } from 'mongoose';

interface User extends Express.User {
  id: Types.ObjectId,
  username: string,
  passwordHash: string,
  emailAdress: string,
}

export default User;
