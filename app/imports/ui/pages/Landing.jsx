import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Nav, Row, Button } from 'react-bootstrap';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
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
              <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-card-nav" as={NavLink} to="/admin" key="admin">View Cards</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link style={{ color: 'black' }} id="add-card-nav" as={NavLink} to="/add" key="add">Add Card</Nav.Link></Nav.Item>
              {/*
              <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Manage Accounts</Nav.Link></Nav.Item>
*/}
            </Nav>
          </Container>
        </Container>
      </Col>
    ) : (
      <Col>
        <div className="partition-bar" />
        <Col className="align-items-center text-center" id="landing-page-top">
          <Container className="text-center">
            <div id="landing-page-title">
              <h1>PROFESSOR! <br /> I CHOOSE YOU!</h1>
              <p>Collect your favorite ICS professors to learn more about them, their courses, and your fellow students!</p>
            </div>
            <div id="landing-page-subtitle">
              <div id="buttonLayer">
                <div id="loginSection">
                  <p>Already a member?</p>
                  <Button id="loginButton" as={NavLink} to="/signin">
                    <PersonFill />
                    LOGIN
                  </Button>
                </div>
                <div id="signupSection">
                  <p>Not a Member?</p>
                  <Button id="signupButton" as={NavLink} to="/signup">
                    <PersonPlusFill />
                    SIGNUP
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Col>
        <div className="partition-bar" />
        <Row id="landing-page-about">
          <h2>About Academia Arena</h2>
          <p>The purpose of this web application is to help incoming students or continuing ICS students, especially those who feel disconnected from their professors, connect with them and learn about them more easily.</p>
          {/* eslint-disable-next-line max-len */}
          <p>Inspired by trading card games such as Magic: The Gathering, Pokemon, Yu-Gi-Oh Academia Arena: ICS Edition revolves around collectible cards that contain information about the professors on the UH Manoa campus. The
            information on the card includes a headshot image, the version of the card (ex: “ICS 314 Spring 2024”, “ICS 311 Fall 2023”, etc.), fun facts, projects they may have worked on, and the rarity of the card.
          </p>
          <p>This platform provides an opportunity for students to meet and interact with others who may have the same class, providing an alleyway to find friends with shared academic interests or professors.</p>
        </Row>
        <div id="divider" />
      </Col>
    )}
  </Col>
);

export default Landing;
