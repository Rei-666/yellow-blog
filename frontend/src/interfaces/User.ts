import { PostResponseInterface } from './Post';

export interface UserInterface {
  posts?: (PostResponseInterface)[] | null;
  _id: string;
  username: string;
}

export interface UserContextInterface {
  user?: UserInterface,
  logged: boolean,
}
