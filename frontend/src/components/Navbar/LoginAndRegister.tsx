import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PropTypes {
  className?: string
}

const defaultProps = {
  className: ''
};

const LoginAndRegister = ({ className }: PropTypes) => (
  <>
    <Nav.Link as={Link} to="/login" className={`mx3 ${className}`}>Login</Nav.Link>
    <Nav.Link as={Link} to="/register" className={`${className}`}>Register</Nav.Link>
  </>
);

LoginAndRegister.defaultProps = defaultProps;

export default LoginAndRegister;
