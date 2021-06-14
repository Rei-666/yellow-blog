import React, { ReactElement } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Card } from 'react-bootstrap';
import { UserInterface } from '../interfaces';

interface PostProps {
  author: UserInterface;
  title?: string;
  children?: ReactElement;
}

const defaultProps = {
  title: 'Title',
  children: <>Body</>
};

const Post = ({ title, children, author }: PostProps) => (
  <Card className="m-3">
    <Card.Header as="h3" className="display-4" style={{ fontSize: '2.7rem' }}>{title}</Card.Header>
    <Card.Body>
      <Card.Subtitle className="text-muted d-flex">
        <div className="ml-auto d-inline-block">
          <CgProfile style={{ marginBottom: '2px' }} />
          {' '}
          {author.username}
        </div>
      </Card.Subtitle>
      <Card.Text as="div">{children}</Card.Text>
    </Card.Body>
  </Card>
);

Post.defaultProps = defaultProps;

export default Post;
