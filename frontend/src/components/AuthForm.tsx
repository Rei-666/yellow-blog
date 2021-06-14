import React, { ChangeEvent, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { SubmitHandler } from '../types';
import { AuthDataInterface } from '../interfaces';

interface AuthFormProps {
  handleSubmit: SubmitHandler
  title: string
  buttonText: string
  error: string,
}

const AuthForm = ({
  handleSubmit, title, buttonText, error
}: AuthFormProps) => {
  const [values, setValues] = useState<AuthDataInterface>({ username: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  };

  return (
    <>
      <h1 className="mb-4">{title}</h1>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
      }}
      >
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={values.username} placeholder="Username" name="username" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={values.password} placeholder="Password" name="password" onChange={handleChange} />
        </Form.Group>
        <Button type="submit">{buttonText}</Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </>
  );
};

export default AuthForm;
