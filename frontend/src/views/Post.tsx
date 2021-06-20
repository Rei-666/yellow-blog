import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BASE_URL } from '../config';
import { useFetch } from '../hooks';
import { Post } from '../components';
import { PostInterface } from '../interfaces';
import { convertPostBodyObjectToHtml } from '../utils';

interface ProfileParams {
  id: string
}

const PostView = () => {
  const { id } = useParams<ProfileParams>();
  const [isLoading, post] = useFetch<PostInterface>(`${BASE_URL}/api/posts/${id}`);

  const renderHtml = () => {
    const htmlBody = convertPostBodyObjectToHtml(post!.body);
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: htmlBody }} />;
  };

  return (
    <Container>
      {isLoading ? 'Loading...' : <Post author={post!.author} title={post?.title} date={post?.date}>{renderHtml()}</Post>}
    </Container>
  );
};

export default PostView;
