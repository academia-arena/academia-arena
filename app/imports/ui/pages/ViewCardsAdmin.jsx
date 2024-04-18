import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Form, InputGroup, Nav, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonCard from '../components/Common-Card';
import RareCard from '../components/Rare-Card';
import LegendaryCard from '../components/Legendary-Card';

/* Renders a table containing all of the Stuff documents. Use <CardItem> to render each row. */
const ViewCardsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Col>
      <Container fluid className="py-3" id="title-block">
        <Container>
          <Nav variant="pills">
            <Col><h2>Admin</h2></Col>
            <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-nav" as={NavLink} to="/list" key="list">View Cards</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link style={{ color: 'black' }} id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Card</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Manage Accounts</Nav.Link></Nav.Item>
          </Nav>
        </Container>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Row className="py-4" style={{ width: '400px' }}>
            <InputGroup>
              <Form.Control id="SearchBar" placeholder="Name"/>
              <Button variant="success" on>Search</Button>
            </InputGroup>
          </Row>
        </Row>
      </Container>
      <Col className="py-5">
        <Container>
          <Row>
            <Col>
              <Row className="justify-content-center">{stuffs.map((stuff) => (stuff.type === 'Common' ? (<CommonCard key={stuff._id} stuff={stuff} />) :
                ('')))}
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-center">{stuffs.map((stuff) => (stuff.type === 'Rare' ? (<RareCard key={stuff._id} stuff={stuff} />) :
                ('')))}
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-center">{stuffs.map((stuff) => (stuff.type === 'Legendary' ? (<LegendaryCard key={stuff._id} stuff={stuff} />) :
                ('')))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Col>
  ) : <LoadingSpinner />);
};

export default ViewCardsAdmin;
