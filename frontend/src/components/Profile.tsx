import React from 'react';
import { Button } from 'react-bootstrap';
import { UserContextInterface } from '../interfaces';

type ContextSetter = React.Dispatch<React.SetStateAction<UserContextInterface>> | null;

const Profile = ({ context, setContext }: {
  context: UserContextInterface,
  setContext: ContextSetter }) => {
  const logout = async () => {
    const res = await fetch('http://localhost:41960/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    const parsedData = await res.json();
    if (setContext && parsedData.success) setContext({ logged: false });
  };

  if (context?.user) {
    return (
      <div>
        <h4>{context.user.username}</h4>
        <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
      </div>
    );
  }
  return null;
};

export default Profile;
