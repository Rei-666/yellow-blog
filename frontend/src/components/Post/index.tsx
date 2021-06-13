import React, { ReactElement } from 'react';

import { Card } from 'react-bootstrap';

interface PostProps {
  title?: string;
  children?: ReactElement;
}

const defaultProps: PostProps = {
  title: 'Title',
  children: <>Body</>
};

const Post = ({ title, children }: PostProps) => (
  <Card className="m-3">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{children}</Card.Text>
    </Card.Body>
  </Card>
);

Post.defaultProps = defaultProps;

export default Post;
