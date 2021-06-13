import React from 'react';
import { UserContextInterface } from '../interfaces';

const UserContext = React.createContext<[
  UserContextInterface,
  React.Dispatch<React.SetStateAction<UserContextInterface>>
] | [UserContextInterface, null]>(
  [{ logged: false }, null]
);

export default UserContext;
