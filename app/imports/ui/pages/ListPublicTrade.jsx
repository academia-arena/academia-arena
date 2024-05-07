import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Nav, Row, Table, Button, Modal, Card } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { TCards } from '../../api/tcard/TCard';
import ListedCard from '../components/ListedCard';
import MyListedCard from '../components/MyListedCard';

const ListPublicTrade = () => {
  const { ready, tcards, currentUser } = useTracker(() => {
    const subscription = Meteor.subscribe(TCards.userTradePublicationName);
    return {
      tcards: TCards.collection.find({ isListedForTrade: 'Yes' }).fetch(),
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

  const handleObtainClick = (tcard) => {
    if (tcard.owner === currentUser.username) {
      alert('You already own this card.');
      return;
    }
    setSelectedCard(tcard);
    setShowConfirmation(true);
  };

  const handleUnlistClick = (tcard) => {
    TCards.collection.update(tcard._id, {
      $set: {
        isListedForTrade: 'No',
      },
    }, (error) => {
      if (error) {
        console.error('Error Unlisting Card:', error);
      } else {
        console.log('Card Unlisted');
      }
    });
  };

  const obtainCard = () => {
    if (selectedCard) {
      TCards.collection.update(selectedCard._id, {
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

  let filteredCards = tcards;

  if (activeView === 'my-listed') {
    filteredCards = tcards.filter(tcard => tcard.owner === currentUser.username);
  } else if (activeView === 'market') {
    filteredCards = tcards.filter(tcard => tcard.owner !== currentUser.username);
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
                <Table className="table-success table-borderless table-striped">
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
                    {filteredCards.map((tcard) => (
                      <ListedCard
                        key={tcard._id}
                        tcard={tcard}
                        onObtainClick={() => handleObtainClick(tcard)}
                      />
                    ))}
                  </tbody>
                </Table>
              </Card>
            ) : (
              <Card id="my-table" className="table-responsive">
                <Table className="table-success table-borderless table-striped">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Owner</th>
                      <th>Unlist?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCards.map((tcard) => (
                      <MyListedCard
                        key={tcard._id}
                        tcard={tcard}
                        onUnlistClick={() => handleUnlistClick(tcard)} // Pass the handleUnlistClick function to MyListedCard component
                      />
                    ))}
                  </tbody>
                </Table>
              </Card>
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
