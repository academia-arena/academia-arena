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

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
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
            {currentUser === 'john@foo.com' ? ([
              <Nav.Link id="collection-nav" as={NavLink} to="/list" key="list">Collection</Nav.Link>,
              <Nav.Link id="pull-nav" as={NavLink} to="/home" key="list">Pull for Cards</Nav.Link>,
              <Nav.Link id="wish-nav" as={NavLink} to="/" key="list">Wishlist</Nav.Link>,
              <Nav.Link id="trade-nav" as={NavLink} to="/" key="list">Market Place</Nav.Link>,
            ]) : ''}
            {currentUser === 'admin@foo.com' ? ([
              <Nav.Link id="admin-collection-nav" as={NavLink} to="/admin" key="list">Admin Collection</Nav.Link>
              // <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Stuff</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
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
