import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Nav, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import CardItem from '../components/CardItem';
import { TCards } from '../../api/tcard/TCard';

/* Renders a table containing all of the Stuff documents. Use <CommonCard> to render each row. */
const AdminPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { tcards, ready } = useTracker(() => {
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
          <Container className="w-50 py-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>firstName</th>
                  <th>lastName</th>
                  <th>course</th>
                  <th>type</th>
                  <th>title</th>
                  <th>description</th>
                  <th>funFact</th>
                  <th>cardName</th>
                  <th>power</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {tcards.map((tcard) => <CardItem key={tcard._id} card={tcard} />)}
              </tbody>
            </Table>
          </Container>
        </Col>
      ) : ('')}
    </Col>
  ) : <LoadingSpinner />);
};

export default AdminPage;
