import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light" id="footer">
    <Container>
      <Col className="text-center">
        Academia Arena Development Team
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="https://academia-arena.github.io/">
          Organization Home Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
