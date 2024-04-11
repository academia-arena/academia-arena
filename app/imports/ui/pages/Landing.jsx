import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <div className="partition-bar"></div>
    <div id="landing-page-top" className="py-3 align-middle">
      <Col fluid className="align-middle text-center">
        <Row id="landing-page-title" className="d-flex flex-column justify-content-center">
          <h1>PROFESSOR!</h1>
          <h1>I CHOOSE YOU!</h1>
        </Row>
        <Row id="landing-page-subtitle" className="d-flex flex-column top-title justify-content-center">
          <p>Collect your favorite ICS professors to learn more about them, their courses, and your fellow students!</p>
        </Row>
      </Col>
    </div>
    <div className="partition-bar"></div>
    <Container>
      <Row id="landing-page-about">
        <h2>About Academia Arena</h2>
        <p>The purpose of this web application is to help incoming students or continuing ICS students, especially those who feel disconnected from their professors, connect with them and learn about them more easily.</p>
        <p>Inspired by trading card games such as Magic: The Gathering, Pokemon, Yu-Gi-Oh Academia Arena: ICS Edition revolves around collectible cards that contain information about the professors on the UH Manoa campus. The information on the card includes a headshot image, the version of the card (ex: “ICS 314 Spring 2024”, “ICS 311 Fall 2023”, etc.), fun facts, projects they may have worked on, and the rarity of the card.</p>
        <p>This platform provides an opportunity for students to meet and interact with others who may have the same class, providing an alleyway to find friends with shared academic interests or professors.</p>
      </Row>
    </Container>
  </Container>
);

export default Landing;
