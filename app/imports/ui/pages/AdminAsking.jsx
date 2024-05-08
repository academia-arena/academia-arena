import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';
import { ExclamationCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { AllCards } from '../../api/allcard/AllCard';
import LoadingSpinner from '../components/LoadingSpinner';

/** Render a Asking page if the user enters a URL that doesn't match any route. */
const AdminAsking = () => {
  const navigate = useNavigate();
  const path = () => {
    navigate('/settings');
  };

  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(AllCards.adminPublicationName);
    const rdy = subscription.ready();
    const document = AllCards.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const remove = (ID) => {
    AllCards.collection.remove(ID);
  };

  function deleteCard() {
    remove(doc._id);
    path();
  }

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center my-5">
        <Col xs={4} className="text-center">
          <Card className="my-5" id="deleteaskingCard">
            <Card.Header><ExclamationCircle id="exclamationCircle" /></Card.Header>
            <Card.Title className="mt-3">Delete Card</Card.Title>
            <Card.Body className="pt-0 pb-4" style={{ fontSize: 15 }}>
              Are you sure you want to delete this card?
              The card will be deleted immediately.
              You can&apos;t undo this action.
            </Card.Body>
            <ButtonGroup>
              <Button id="cancel-button" variant="none" onClick={path}>Cancel</Button>
              <Button id="delete-button-2" variant="none" onClick={() => deleteCard()}>Delete</Button>
            </ButtonGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AdminAsking;
