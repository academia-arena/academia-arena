import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Image, Row, Button } from 'react-bootstrap';
import { LockFill, HeartFill } from 'react-bootstrap-icons';

// eslint-disable-next-line react/prop-types
const CommonCardWishlist = ({ card, inWishlist, addToWishlist }) => {
  const renderHeartIcon = () => {
    if (!inWishlist) {
      return (
        <Button
          variant="link"
          className="position-absolute top-4 end-0"
          style={{ top: '54%', marginRight: '5%' }}
          onClick={() => addToWishlist(card._id)}
        >
          <HeartFill size={30} color="red" />
        </Button>
      );
    }
    return null;
  };
  return (
    <Card id="Cards1" className="align-items-center my-2 m-4" style={{ width: '370px', height: '540px' }}>
      {renderHeartIcon()}
      <Card.Title id="CardsTitle1">
        <Container className="text-center">
          <strong>{card.role} {card.firstName} {card.lastName}</strong>
        </Container>
      </Card.Title>
      <Card.Body id="CardsImage1" className="text-center mb-2 mt-3">
        <Image src={card.image} height="150px" />
      </Card.Body>
      <Card.Text id="CardsText1">
        <Row className="text-center">
          <th style={{ fontSize: '20px' }}>{card.type} {card.role}</th>
        </Row>
        <Container>
          <Row className="mt-5">
            <LockFill size={80} color="#B3A88D" />
          </Row>
        </Container>
      </Card.Text>
    </Card>
  );
};

CommonCardWishlist.propTypes = {
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
    addToWishlist: PropTypes.func,
  }).isRequired,
  inWishlist: PropTypes.bool.isRequired,
};

export default CommonCardWishlist;
