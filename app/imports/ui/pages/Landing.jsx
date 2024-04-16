import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Col>
    {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
      <Col>
        <Container fluid className="py-3" id="title-block">
          <Container>
            <Nav variant="pills">
              <Col><h2>Admin</h2></Col>
              <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-nav" as={NavLink} to="/list" key="list">View Cards</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link style={{ color: 'black' }} id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Card</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Manage Accounts</Nav.Link></Nav.Item>
            </Nav>
          </Container>
        </Container>
      </Col>
    ) : (
      <Container id="landing-page" fluid className="py-3">
        <Row className="align-middle text-center">
          <Col xs={4}>
            <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
          </Col>

          <Col xs={8} className="d-flex flex-column justify-content-center">
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Col>
        </Row>
      </Container>
    )}
  </Col>
);

export default Landing;
