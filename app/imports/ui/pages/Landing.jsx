import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <><h1 className="subtitle"> </h1> {/* Adds yellow bar subtitle thing :3 */}
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h2>Welcome to this template</h2>
          <p>Now get to work and modify this app!</p>
        </Col>

      </Row>
    </Container>
  </>
);

export default Landing;
