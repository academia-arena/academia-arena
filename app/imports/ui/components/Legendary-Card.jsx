import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List card (Admin) table. See pages/AdminPage.jsx. */
const LegendaryCard = ({ card }) => (
  <Card id="Cards3" className="align-items-center my-2" style={{ width: '370px', height: '570px' }}>
    <Card.Title id="CardsTitle3">
      <Container className="text-center">
        <strong>{card.role} {card.lastName}, {card.cardName}</strong>
      </Container>
    </Card.Title>
    <Card.Body id="CardsImage3" className="text-center">
      <Image src={card.image} height="150px" />
    </Card.Body>
    <Card.Text id="CardsText3">
      <Row className="text-center">
        <th style={{ fontSize: '20px' }}>{card.type} {card.role}</th>
      </Row>
      <Row className="ps-5">
        <Col>Course: {card.course}</Col>
        <Col>Power: {card.power}</Col>
      </Row>
      <Container>
        <th className="py-2">Special Move: {card.title}</th>
        {card.description}
        <th className="py-2">Fun Fact: {card.funFact}</th>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Link to={`/edit/${card._id}`}>Edit</Link>
        ) : (<Link to={`/listtrade/${card._id}`}>Trade</Link>)}
      </Container>
    </Card.Text>
  </Card>
);

// Require a document to be passed to this component.
LegendaryCard.propTypes = {
  card: PropTypes.shape({
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

export default LegendaryCard;
