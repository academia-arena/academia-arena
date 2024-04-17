import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Nav, Row, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/Stuff';
import CommonCard from '../components/Common-Card';
import LoadingSpinner from '../components/LoadingSpinner';
import CardItem from '../components/CardItem';

/* Renders a table containing all of the Stuff documents. Use <CommonCard> to render each row. */
const AdminPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { stuffs, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Stuffs.collection.find({}).fetch();
    return {
      stuffs: items,
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
                <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-nav" as={NavLink} to="/list" key="list">View Cards</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={{ color: 'black' }} id="add-stuff-nav" as={NavLink} to="/add" key="add">Add Card</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Manage Accounts</Nav.Link></Nav.Item>
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
                {stuffs.map((stuff) => <CardItem key={stuff._id} stuff={stuff} />)}
              </tbody>
            </Table>
          </Container>
        </Col>
      ) : (
        <Container className="py-3">
          <Row className="justify-content-center">
            <Col md={7}>
              <Col className="text-center"><h2>List Stuff (Admin)</h2></Col>
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
                    <th>owner</th>
                  </tr>
                </thead>
                <tbody>
                  {stuffs.map((stuff) => <CommonCard key={stuff._id} stuff={stuff} />)}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </Col>
  ) : <LoadingSpinner />);
};

export default AdminPage;
