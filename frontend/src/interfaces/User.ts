import { PostInterface } from './Post';

export interface UserInterface {
  posts?: (PostInterface)[] | null;
  _id: string;
  username: string;
  __v: number;
}

export interface UserContextInterface {
  user?: UserInterface,
  logged: boolean,
}
