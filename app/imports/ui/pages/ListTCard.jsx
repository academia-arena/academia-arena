import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { TCards } from '../../api/tcard/TCard';
import LoadingSpinner from '../components/LoadingSpinner';
import TCardItem from '../components/TCardItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListTCard = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, tcards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(TCards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const tcardItems = TCards.collection.find({}).fetch();
    return {
      tcards: tcardItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <><h1 className="subtitle">Card Collection</h1>
      <Container className="py-3">
        <Row xs={1} md={2} lg={3} className="gy-4">
          {tcards.map((tcard) => (<Col key={tcard.id}><TCardItem tcard={tcard} /></Col>))}
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default ListTCard;