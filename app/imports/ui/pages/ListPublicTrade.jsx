import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { TCards } from '../../api/tcard/TCard';
import TradeItem from '../components/TradeItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListPublicTrade = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { tcards, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(TCards.userTradePublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Filter the cards to include only those where collection property is "trade"
    const items = TCards.collection.find({ collection: 'Trade' }).fetch();
    return {
      tcards: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Col>
      <Container fluid className="py-3" id="title-block">
        <Container>
          <h2 className="text-center pt-2">MARKETPLACE</h2>
          <p className="text-center">Trade Cards here!</p>
        </Container>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Professor</th>
                  <th>Name</th>
                  <th>Rank</th>
                  <th>Owner</th>
                  <th>Trade</th>
                </tr>
              </thead>
              <tbody>
                {tcards.map((tcard) => <TradeItem key={tcard._id} tcard={tcard} />)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Col>
  ) : <LoadingSpinner />);
};

export default ListPublicTrade;
