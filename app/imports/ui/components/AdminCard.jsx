import React from 'react';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Roles } from 'meteor/alanning:roles';
/** Renders a single row in the List card (Admin) table. See pages/AdminPage.jsx. */
const AdminCard = ({ card, background, title, image, text }) => (
  <Card id={background} className="align-items-center my-2" style={{ width: '370px', height: '570px' }}>
    <Card.Title id={title}>
      <Container className="text-center align-content-center">
        <strong>{card.role} {card.firstName} {card.lastName}</strong>
        <div style={{ fontSize: '16px' }}><i>{card.cardName}</i></div>
      </Container>
    </Card.Title>
    <Card.Body id={image} className="text-center">
      <Image src={card.image} height="150px" />
    </Card.Body>
    <Card.Text id={text}>
      <Container>
        <Row className="text-center">
          <th style={{ fontSize: '20px' }}>{card.type} {card.role}</th>
        </Row>
        <Row className="text-center" style={{ lineHeight: '10px' }}>
          <th>Power: {card.power}</th>
        </Row>
        <Row>
          <th>Course(s):</th>
          <td>{card.course}</td>
        </Row>
        <Row>
          <th className="py-2">Special Move: {card.title}</th>
        </Row>
        <Row>
          <td>{card.description} </td>
        </Row>
        <Row>
          <th className="py-2">Fun Fact: {card.funFact}</th>
        </Row>
        {/* {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Link to={`/edit/${card._id}`}>Edit</Link>
        ) : (<Link to={`/listtrade/${card._id}`} id="trade-button">Trade</Link>)} */}
      </Container>
    </Card.Text>
    <Card.Text>
      <Container className="justify-content-center text-center">
        <Row className="py-1">
          <Link to={`/edit/${card._id}`} id="edit-button">Edit</Link>
        </Row>
        <Row className="py-1">
          <Link to={`/adminasking/${card._id}`} id="delete-button">Delete</Link>
        </Row>
      </Container>
    </Card.Text>
  </Card>
);

// Require a document to be passed to this component.
AdminCard.propTypes = {
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
    isListedForTrade: PropTypes.string,
  }).isRequired,
};

AdminCard.propTypes = {
  background: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default AdminCard;
