import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Card, Image, Row, Col } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const TCardItem = ({ tcard }) => (
  <Card className="h-100 text-center">
    <Card.Header>
      <Card.Title>{tcard.name}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Image width={75} src={tcard.image} />
      <Card.Text><h5>{tcard.rank}</h5></Card.Text>
      <Card.Text>
        <Row>
          <Col>Course: {tcard.course}</Col>
          <Col>Power: {tcard.power}</Col>
        </Row>
      </Card.Text>
      <Card.Text><strong>Special Move: {tcard.smtitle}</strong></Card.Text>
      <Card.Text>{tcard.smdescription}</Card.Text>
      {/* <Link to={`/edit/${tcard._id}`}>Edit</Link> */}
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
TCardItem.propTypes = {
  tcard: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    rank: PropTypes.string,
    course: PropTypes.string,
    power: PropTypes.number,
    smtitle: PropTypes.string,
    smdescription: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default TCardItem;
