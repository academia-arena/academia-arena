import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Image, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { AllCards } from '../../api/allcard/AllCard';

const ThisCard = ({ card, background, title, image, text }) => {
  const [isListedForTrade, setIsListedForTrade] = useState(card.isListedForTrade);

  const updateTradeStatus = (newStatus) => {
    AllCards.collection.update(card._id, { $set: { isListedForTrade: newStatus } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        setIsListedForTrade(newStatus);
        swal('Success', `Card is now ${newStatus === 'Yes' ? 'listed for trade.' : 'no longer listed for trade.'}`, 'success');
      }
    });
  };

  const handleTradeButtonClick = () => {
    if (isListedForTrade === 'Yes') {
      swal({
        title: 'Are you sure?',
        text: 'Do you want to take this card off the trade list?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            updateTradeStatus('No');
          }
        });
    } else {
      updateTradeStatus('Yes');
    }
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
            <td>{card.description}</td>
          </Row>
          <Row>
            <th className="py-2">Fun Fact: {card.funFact}</th>
          </Row>
        </Container>
      </Card.Text>
      <Card.Text>
        <Container className="justify-content-center text-center">
          <Row className="py-1">
            <Button onClick={handleTradeButtonClick} id="trade-button" variant={isListedForTrade === 'Yes' ? 'success' : 'primary'}>
              {isListedForTrade === 'Yes' ? 'Listed for Trade' : 'List for Trade'}
            </Button>
          </Row>
        </Container>
      </Card.Text>
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
};

export default ThisCard;
