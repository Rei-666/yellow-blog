import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Nav, Navbar, NavbarBrand,
} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { UserContext } from '../../contexts';

const CustomNavbar = () => {
  const [context] = useContext(UserContext);

  return (
    <Navbar bg="primary" expand="sm" className="mb-5">
      <Container>
        <NavbarBrand as={Link} to="/">Yellow Blog</NavbarBrand>
        <NavbarToggle aria-controls="navbar-cool" />
        <NavbarCollapse id="navbar-cool">
          <Nav className="mr-auto">
            {context.user && (
            <Nav.Link as={Link} to="/createPost">
              Create a post
            </Nav.Link>
            )}
            <Nav.Link as={Link} to="/help">
              Help
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {context.user ? context.user.username : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
