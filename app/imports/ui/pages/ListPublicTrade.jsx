import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Nav, Row, Table, Button, Modal, Card } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import ListedCard from '../components/ListedCard';
import MyListedCard from '../components/MyListedCard';
import { AllCards } from '../../api/allcard/AllCard';

const ListPublicTrade = () => {
  const { ready, cards, currentUser } = useTracker(() => {
    const subscription = Meteor.subscribe(AllCards.userTradePublicationName);
    return {
      cards: AllCards.collection.find({ isListedForTrade: 'Yes' }).fetch(),
      ready: subscription.ready(),
      currentUser: Meteor.user(),
    };
  }, []);

  const [activeView, setActiveView] = useState('market');
  const [selectedCard, setSelectedCard] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNavClick = (view) => {
    setActiveView(view);
  };

  const handleObtainClick = (card) => {
    if (card.owner === currentUser.username) {
      alert('You already own this card.');
      return;
    }
    setSelectedCard(card);
    setShowConfirmation(true);
  };

  const obtainCard = () => {
    if (selectedCard) {
      AllCards.collection.update(selectedCard._id, {
        $set: {
          owner: currentUser.username,
          isListedForTrade: 'No',
        },
      }, (error) => {
        if (error) {
          console.error('Error Making Trade:', error);
        } else {
          console.log('Card Obtained. Check your Collection!');
        }
      });
      setShowConfirmation(false);
      setSelectedCard(null);
    }
  };

  let filteredCards = cards; // Initialize filteredCards with all cards

  if (activeView === 'my-listed') {
    // If in "My Listed Cards" view, filter cards owned by the current user
    filteredCards = cards.filter(tcard => tcard.owner === currentUser.username);
  } else if (activeView === 'market') {
    // If in "Market" view, filter out cards owned by the current user
    filteredCards = cards.filter(tcard => tcard.owner !== currentUser.username);
  }

  return ready ? (
    <Col id="marketplace-page">
      <Container fluid className="py-3" id="title-block">
        <Container>
          <Nav>
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
      <Container className="py-3" id="tables">
        <Row className="justify-content-center">
          <Col md={7}>
            {activeView === 'market' ? (
              <Card id="market-table" className="table-responsive">
                <Table className="table-success table-striped table-borderless">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Owner</th>
                      <th>Trade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCards.map((card) => (
                      <ListedCard
                        key={card._id}
                        tcard={card}
                        onObtainClick={() => handleObtainClick(card)}
                      />
                    ))}
                  </tbody>
                </Table>
              </Card>
            ) : (
              <Table id="my-table" className="table-success table-borderless">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCards.map((card) => (
                    <MyListedCard
                      key={card._id}
                      tcard={card}
                    />
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Card Acquisition</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to obtain this card?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button variant="primary" onClick={obtainCard}>Yes, Obtain Card</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  ) : <LoadingSpinner />;
};

export default ListPublicTrade;
