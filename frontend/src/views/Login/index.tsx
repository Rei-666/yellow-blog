import React, {
  ChangeEvent, FormEvent, useContext, useState
} from 'react';
import {
  Form, Container, Col, Button, Alert
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts';
import { BASE_URL } from '../../config';

interface LoginDataInterface {
  username: string,
  password: string
}

const LoginView = () => {
  const [values, setValues] = useState<LoginDataInterface>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [context, setContext] = useContext(UserContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
          <h1 className="mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={values.username} placeholder="Username" name="username" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={values.password} placeholder="Password" name="password" onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Container>
    )
  );
};

export default LoginView;
