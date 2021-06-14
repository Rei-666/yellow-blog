import { PostInterface } from './Post';

export interface UserInterface {
  posts?: (PostInterface)[] | null;
  _id: string;
  username: string;
}

export interface UserContextInterface {
  user?: UserInterface,
  logged: boolean,
}
