import React, { useState } from 'react'; // Import useState here
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Nav, Row, Table } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { TCards } from '../../api/tcard/TCard';
import ListedCard from '../components/ListedCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListPublicTrade = () => {
  // Fetching and subscribing to the tcards data
  const { tcards, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(TCards.userTradePublicationName);
    const items = TCards.collection.find({ isListedForTrade: 'Yes' }).fetch();
    return {
      tcards: items,
      ready: subscription.ready(),
    };
  }, []);

  const [activeView, setActiveView] = useState('market');

  const handleNavClick = (view) => {
    setActiveView(view);
  };

  let filteredCards = tcards; // Initialize filteredCards with all cards

  if (activeView === 'my-listed') {
    // If in "My Listed Cards" view, filter cards owned by the current user
    filteredCards = tcards.filter(tcard => tcard.owner === Meteor.users.findOne(Meteor.userId()).username);
  }

  if (activeView === 'market') {
    // If in "Market" view, return all cards
    filteredCards = tcards;
  }

  return ready ? (
    <Col>
      <Container fluid className="py-3" id="title-block">
        <Container>
          <Nav variant="pills">
            <Col>
              <h2 className="pt-2">MARKETPLACE</h2>
              <p>Trade Cards Here!</p>
            </Col>
            <Nav.Item className="pt-4">
              <Nav.Link onClick={() => handleNavClick('market')} active={activeView === 'market'} id="public-listed-nav">Market</Nav.Link>
            </Nav.Item>
            <Nav.Item className="pt-4">
              <Nav.Link onClick={() => handleNavClick('my-listed')} active={activeView === 'my-listed'} id="my-listed-nav">My Listed Cards</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Table striped bordered hover id="trade-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Owner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCards.map((tcard) => <ListedCard key={tcard._id} tcard={tcard} />)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Col>
  ) : <LoadingSpinner />;
};

export default ListPublicTrade;
