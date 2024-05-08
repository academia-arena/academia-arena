import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Image, Row, Button, Modal } from 'react-bootstrap';

const ThisCard = ({ card, background, title, image, text, onTradeClick }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTradeButtonClick = () => {
    setShowConfirmation(true);
  };

  const confirmTrade = () => {
    // Call the function passed from the parent to update the isListedForTrade property to 'Yes'
    onTradeClick(card);
    // Close the confirmation modal
    setShowConfirmation(false);
  };

  return (
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
        </Container>
      </Card.Text>
      <Card.Text>
        <Container className="justify-content-center text-center">
          <Row className="py-1">
            <Button onClick={handleTradeButtonClick} id="trade-button">TRADE</Button>
          </Row>
        </Container>
      </Card.Text>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to list this card for trade?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirmTrade}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

ThisCard.propTypes = {
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
  background: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // Function to handle the trade action
  onTradeClick: PropTypes.func.isRequired,
};

export default ThisCard;
