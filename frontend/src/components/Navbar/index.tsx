import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Dropdown, Nav, Navbar, NavbarBrand,
} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { UserContext } from '../../contexts';
import { BASE_URL } from '../../config';
import LoginAndRegister from './LoginAndRegister';

const CustomNavbar = () => {
  const [context, setContext] = useContext(UserContext);

  const logout = async () => {
    const res = await fetch(`${BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    const parsedData = await res.json();
    if (setContext && parsedData.success) setContext({ logged: false });
  };

  return (
    <Navbar expand="sm" className="mb-5">
      <Container>
        <NavbarBrand as={Link} to="/">Yellow Blog</NavbarBrand>
        <NavbarToggle aria-controls="navbar-cool" />
        <NavbarCollapse id="navbar-cool">
          <Nav className="mr-auto">
            {context.user ? (
              <>
                <Nav.Link as={Link} to="/createPost">
                  Create a post
                </Nav.Link>
                <Nav.Link className="d-block d-sm-none" onClick={logout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <LoginAndRegister className="d-sm-none" />
            )}
          </Nav>
          <Nav className="justify-content-end d-none d-sm-flex">
            {context.user ? (
              <Dropdown>
                <Dropdown.Toggle>
                  {context.user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu align="right">
                  <Dropdown.Item as="button" onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LoginAndRegister />
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
