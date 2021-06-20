import React, { ReactElement } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Card } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { UserInterface } from '../interfaces';

interface PostProps {
  author: UserInterface;
  title?: string;
  children?: ReactElement;
  date?: string;
}

const defaultProps = {
  title: 'Title',
  children: <>Body</>,
  date: new Date()
};

const Post = ({
  title, children, author, date
}: PostProps) => (
  <Card className="m-3">
    <Card.Header as="h3" className="display-4" style={{ fontSize: '2.7rem' }}>{title}</Card.Header>
    <Card.Body>
      <Card.Subtitle className="text-muted d-flex">
        <div className="ml-auto d-inline-block">
          <p className="d-inline-block" style={{ fontWeight: 'normal' }}>
            {dateFormat(date, 'mmm d')}
          </p>
          <CgProfile className="ml-1" style={{ marginBottom: '2px' }} />
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
