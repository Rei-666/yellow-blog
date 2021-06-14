import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthForm } from '../components';
import { BASE_URL } from '../config';
import { AuthDataInterface, ModalInterface } from '../interfaces';

interface RegisterViewProps {
  setModal: React.Dispatch<React.SetStateAction<ModalInterface>>
}

const RegisterView = ({ setModal }: RegisterViewProps) => {
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async (values: AuthDataInterface) => {
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
      });

      const parsedData = await response.json();

      setModal((oldValues) => ({
        ...oldValues, show: true, title: 'Congrats!', children: 'Your registration was successful, now please log in'
      }));
      if (parsedData.success) history.push('/login');
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Col lg="6">
        <AuthForm handleSubmit={handleSubmit} title="Sign up" buttonText="Let's go!" error={error} />
      </Col>
    </Container>
  );
};

export default RegisterView;
