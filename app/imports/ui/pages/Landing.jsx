import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <div className="partition-bar"/>
    <div id="landing-page-top" className="py-3 align-middle">
      <Col fluid className="align-middle text-center">
        <Row id="landing-page-title" className="d-flex flex-column justify-content-center">
          <h1>PROFESSOR! I CHOOSE YOU!</h1>
          <p>Collect your favorite ICS professors to learn more about them, their courses, and your fellow students!</p>
        </Row>
        <Row id="landing-page-subtitle" className="d-flex flex-column justify-content-center">
          <Col fluid className="align-middle text-center">
            <div id="buttonLayer">
              <div id="loginSection">
                <p>Already a member?</p>
                <Button id="loginButton" as={NavLink} to="/signin">
                  <PersonFill/>
                  LOGIN
                </Button>
              </div>
              <div id="signupSection">
                <p>Not a Member?</p>
                <Button id="signupButton" as={NavLink} to="/signup">
                  <PersonPlusFill/>
                  SIGNUP
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </div>
    <div className="partition-bar"/>
    <Container>
      <Row id="landing-page-about">
        <h2>About Academia Arena</h2>
        <p>The purpose of this web application is to help incoming students or continuing ICS students, especially those who feel disconnected from their professors, connect with them and learn about them more easily.</p>
        {/* eslint-disable-next-line max-len */}
        <p>Inspired by trading card games such as Magic: The Gathering, Pokemon, Yu-Gi-Oh Academia Arena: ICS Edition revolves around collectible cards that contain information about the professors on the UH Manoa campus. The information on
          the card includes a headshot image, the version of the card (ex: “ICS 314 Spring 2024”, “ICS 311 Fall 2023”, etc.), fun facts, projects they may have worked on, and the rarity of the card.
        </p>
        <p>This platform provides an opportunity for students to meet and interact with others who may have the same class, providing an alleyway to find friends with shared academic interests or professors.</p>
      </Row>
    </Container>
    <academia-logo>
      <img
        src="https://cdn.discordapp.com/attachments/1193987181518274691/1227563652362797066/b158cb8ec1b0c75eda5a8b31c1408b21_2.png?ex=6632173d&is=661fa23d&hm=935ab6d48fdbf3c660bc95ee13d1fd41ac76bca9ceb4a08eed685ce7baf50593"
        alt="Academia Logo"
      />
    </academia-logo>
  </Container>
);

export default Landing;
