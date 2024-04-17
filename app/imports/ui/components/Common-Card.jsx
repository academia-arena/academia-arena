import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';

/** Renders a single row in the List Stuff (Admin) table. See pages/AdminPage.jsx. */
const CommonCard = ({ stuff }) => (
  <Card id="Cards1" className="align-items-center my-2" style={{ width: '370px', height: '540px' }}>
    <Card.Title id="CardsTitle1">
      <Container className="text-center">
        <strong>{stuff.role} {stuff.lastName}</strong>
      </Container>
    </Card.Title>
    <Card.Body id="CardsImage1" className="text-center">
      <Image src={stuff.image} height="150px" />
    </Card.Body>
    <Card.Text id="CardsText1">
      <Row className="text-center">
        <th style={{ fontSize: '20px' }}>{stuff.type} {stuff.role}</th>
      </Row>
      <Row className="ps-5">
        <Col>Course: {stuff.course}</Col>
        <Col>Power: {stuff.power}</Col>
      </Row>
      <Container>
        <th className="py-2">Special Move: {stuff.title}</th>
        {stuff.description}
        <th className="py-2">Fun Fact: {stuff.funFact}</th>
      </Container>
    </Card.Text>
  </Card>
);

// Require a document to be passed to this component.
CommonCard.propTypes = {
  stuff: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    course: PropTypes.string,
    type: PropTypes.string,
    role: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    funFact: PropTypes.string,
    cardName: PropTypes.string,
    image: PropTypes.string,
    power: PropTypes.number,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default CommonCard;
