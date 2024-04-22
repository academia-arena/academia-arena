import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { TCards } from '../../api/tcard/TCard';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonCard from '../components/Common-Card';
import RareCard from '../components/Rare-Card';
import LegendaryCard from '../components/Legendary-Card';

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
    <>
      <div id="partition-bar">
        <h1 className="subtitle">Card Collection</h1>
        <div id="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <Container className="py-3">
        <Row style={{ paddingLeft: '6vh' }} className="py-3 gx-2 justify-content-center">
          {tcards.map((tcard) => {
            if (tcard.type === 'Common') return <Col><CommonCard key={tcard._id} card={tcard} /></Col>;
            if (tcard.type === 'Rare') return <Col><RareCard key={tcard._id} card={tcard} /></Col>;
            return <Col><LegendaryCard key={tcard._id} card={tcard} /></Col>;
          })}
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default ListTCard;
