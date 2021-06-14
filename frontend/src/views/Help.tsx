import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HelpView = () => (
  <Container>
    <Alert variant="info">
      There is currently no help page 😥
    </Alert>
    <Link to="/">Go back</Link>

  </Container>
);

export default HelpView;
