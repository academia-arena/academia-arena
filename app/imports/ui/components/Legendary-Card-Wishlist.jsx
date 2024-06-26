import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Image, Row, Button } from 'react-bootstrap';
import { LockFill, HeartFill } from 'react-bootstrap-icons';

// eslint-disable-next-line react/prop-types
const LegendaryCardWishlist = ({ card, inWishlist, addToWishlist }) => {
  const renderHeartIcon = () => {
    if (!inWishlist) {
      return (
        <Button
          variant="link"
          className="position-absolute top-0 end-0 m-2"
          onClick={() => addToWishlist(card._id)}
        >
          <HeartFill size={24} color="red" />
        </Button>
      );
    }
    return null;
  };
  return (
    <Card id="Cards3" className="align-items-center my-2 m-4" style={{ width: '370px', height: '540px' }}>
      {renderHeartIcon()}
      <Card.Title id="CardsTitle3">
        <Container className="text-center">
          <strong>{card.role} {card.lastName}</strong>
        </Container>
      </Card.Title>
      <Card.Body id="CardsImage3" className="text-center mb-2 mt-3">
        <Image src={card.image} height="150px" />
      </Card.Body>
      <Card.Text id="CardsText3">
        <Row className="text-center">
          <th style={{ fontSize: '20px' }}>{card.type} {card.role}</th>
        </Row>
        <Container>
          <Row className="mt-5">
            <LockFill size={80} color="#3FB76B" />
          </Row>
        </Container>
      </Card.Text>
    </Card>
  );
};

LegendaryCardWishlist.propTypes = {
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

export default LegendaryCardWishlist;
