import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Row, Col, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const isAdmin = currentUser === 'admin@foo.com';
  const isLoggedIn = !!currentUser;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/home" exact>
          <Row id="home-link-container" className="p-2 align-items-center">
            <Col xs="auto">
              <Image src="/images/AcademiaArenaLogo.png" alt="Academia Arena Logo" id="logo" />
            </Col>
            <Col>
              <h2 style={{ color: '#faf3e2' }} className="m-0" id="logo-title">Academia Arena</h2>
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {isLoggedIn && (
              <>
                <Nav.Link id="collection-nav" as={NavLink} to="/list">Collection</Nav.Link>
                <Nav.Link id="pull-nav" as={NavLink} to="/home">Pull for Cards</Nav.Link>
                <Nav.Link id="wish-nav" as={NavLink} to="/home">Wishlist</Nav.Link>
                <Nav.Link id="trade-nav" as={NavLink} to="/home">Market Place</Nav.Link>
                {isAdmin && (
                  <Nav.Link id="admin-collection-nav" as={NavLink} to="/admin">Admin Collection</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {!isLoggedIn ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
