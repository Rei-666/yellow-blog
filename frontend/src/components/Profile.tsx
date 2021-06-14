import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom';
import { PostInterface, UserInterface } from '../interfaces';
import { useFetch } from '../hooks';
import { BASE_URL } from '../config';

const fetchOptions: RequestInit = {
  credentials: 'include',
};

const Profile = ({ user } : { user: UserInterface }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, posts] = useFetch<Array<PostInterface>>(`${BASE_URL}/api/profile/posts`, fetchOptions);

  // eslint-disable-next-line no-underscore-dangle
  const renderPostTitles = () => posts?.map((post) => <li key={post._id}><Link key={post._id} to={`/posts/${post._id}`}>{post.title}</Link></li>);

  return (
    <div className="d-none d-lg-block">
      <h4>{user.username}</h4>
      <ul>
        {renderPostTitles()}
      </ul>
    </div>
  );
};

export default Profile;
