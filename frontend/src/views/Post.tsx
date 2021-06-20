import React, { useContext, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../config';
import { useFetch } from '../hooks';
import { Post } from '../components';
import { PostInterface } from '../interfaces';
import { convertPostBodyObjectToHtml } from '../utils';
import { UserContext } from '../contexts';

interface ProfileParams {
  id: string
}

const PostView = () => {
  const { id } = useParams<ProfileParams>();
  const postUrl = `${BASE_URL}/api/posts/${id}`;
  const [isLoading, post] = useFetch<PostInterface>(postUrl);
  const [show, setShow] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [context] = useContext(UserContext);
  const history = useHistory();

  const renderHtml = () => {
    const htmlBody = convertPostBodyObjectToHtml(post!.body);
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: htmlBody }} />;
  };

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const deletePost = async () => {
    try {
      const response = await fetch(postUrl, {
        method: 'DELETE',
        credentials: 'include'
      });
      const parsedData = await response.json();
      if (parsedData.success) {
        setIsDeleteLoading(false);
        hideModal();
        history.push('/');
      } else {
        throw new Error();
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong :(');
      setIsDeleteLoading(false);
    }
  };

  return (
    <Container>
      {isLoading ? 'Loading...' : <Post author={post!.author} title={post?.title} date={post?.date}>{renderHtml()}</Post>}
      {context.user && (
      <div className="d-flex">
        <Link to={`/edit/${id}`}>
          <Button variant="secondary" className="mx-3">Edit</Button>
        </Link>
        <Button variant="danger" onClick={showModal}>Delete</Button>
      </div>
      )}
      <Modal show={show} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>
            Warning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to this delete this post? It cannot be undone!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" disabled={isDeleteLoading} onClick={deletePost}>
            Yes
          </Button>
          <Button variant="primary" disabled={isDeleteLoading} onClick={hideModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PostView;
