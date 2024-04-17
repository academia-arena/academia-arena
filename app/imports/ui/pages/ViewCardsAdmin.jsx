import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Col, Container, Form, InputGroup, Nav, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonCard from '../components/Common-Card';
import RareCard from '../components/Rare-Card';
import LegendaryCard from '../components/Legendary-Card';
import { TCards } from '../../api/tcard/TCard';

/* Renders a table containing all of the Stuff documents. Use <CardItem> to render each row. */
const ViewCardsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, tcards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(TCards.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const cardItems = TCards.collection.find({}).fetch();
    return {
      tcards: cardItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Col>
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
        <Col>
          <Container fluid className="py-3" id="title-block">
            <Container>
              <Nav variant="pills">
                <Col><h2>Admin</h2></Col>
                <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-card-nav" as={NavLink} to="/admin" key="admin">View Cards</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={{ color: 'black' }} id="add-card-nav" as={NavLink} to="/add" key="add">Add Card</Nav.Link></Nav.Item>
                {/*
                <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Manage Accounts</Nav.Link></Nav.Item>
*/}
              </Nav>
            </Container>
          </Container>
          <Container>
            <Row className="justify-content-center">
              <Row className="py-4" style={{ width: '400px' }}>
                <InputGroup>
                  <Form.Control id="SearchBar" placeholder="Name" />
                  <Button variant="success">Search</Button>
                </InputGroup>
              </Row>
            </Row>
          </Container>
          <Col className="py-5">
            <Container>
              <Row>
                <Col>
                  <Row className="justify-content-center">{tcards.map((tcard) => (tcard.type === 'Common' ? (<CommonCard key={tcard._id} card={tcard} />) :
                    ('')))}
                  </Row>
                </Col>
                <Col>
                  <Row className="justify-content-center">{tcards.map((tcard) => (tcard.type === 'Rare' ? (<RareCard key={tcard._id} card={tcard} />) :
                    ('')))}
                  </Row>
                </Col>
                <Col>
                  <Row className="justify-content-center">{tcards.map((tcard) => (tcard.type === 'Legendary' ? (<LegendaryCard key={tcard._id} card={tcard} />) :
                    ('')))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Col>
      ) : ('')}
    </Col>
  ) : <LoadingSpinner />);
};

export default ViewCardsAdmin;