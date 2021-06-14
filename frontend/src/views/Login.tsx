import React, {
  useContext, useState
} from 'react';
import { Container, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts';
import { BASE_URL } from '../config';
import { AuthForm } from '../components';
import { AuthDataInterface } from '../interfaces';

const LoginView = () => {
  const [error, setError] = useState<string>('');
  const [context, setContext] = useContext(UserContext);

  const handleSubmit = async (values: AuthDataInterface) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
      });

      const parsedData = await response.json();

      if (setContext === null) throw new Error('Fatal error');

      if (parsedData.logged === true) setContext(parsedData);
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    context.user ? <Redirect to="/" /> : (
      <Container className="d-flex justify-content-center">
        <Col lg="6">
          <AuthForm handleSubmit={handleSubmit} title="Login" buttonText="Login" error={error} />
        </Col>
      </Container>
    )
  );
};

export default LoginView;
