import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Nav, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/* A simple static component to render some text for the home page. */
const HomePage = () => (
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
              <div className="chat-bubble-container">
                <div className="chat-bubble">
                  <h1>Welcome ICS Trainer!</h1>
                </div>
              </div>
              <Image src="https://i.imgur.com/f4UjOmg.png" alt="Pixel Professor" id="logo" style={{ width: '130px', height: '130px' }} />
              <p>Start collecting your favorite professors! </p>
              <Container className="d-flex justify-content-center">
                <Image src="https://i.pinimg.com/originals/9e/f8/b9/9ef8b9835ab9dd23b9376e92ba219ff2.jpg" alt="Grass Sprite" id="grass" />
                <Image src="https://i.pinimg.com/originals/9e/f8/b9/9ef8b9835ab9dd23b9376e92ba219ff2.jpg" alt="Grass Sprite" id="grass" />
                <Nav.Item><Nav.Link className="navButton" id="pull-nav" as={NavLink} to="/pull">Pull for Cards</Nav.Link></Nav.Item>
                <Image src="https://i.pinimg.com/originals/9e/f8/b9/9ef8b9835ab9dd23b9376e92ba219ff2.jpg" alt="Grass Sprite" id="grass" />
                <Image src="https://i.pinimg.com/originals/9e/f8/b9/9ef8b9835ab9dd23b9376e92ba219ff2.jpg" alt="Grass Sprite" id="grass" />
              </Container>
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

export default HomePage;
