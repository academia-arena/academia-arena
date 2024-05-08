import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Col, Container, Form, InputGroup, Nav, Navbar, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { AllCards } from '../../api/allcard/AllCard';
import AccountItem from '../components/AccountItem';

/* Renders a table containing all of the Stuff documents. Use <CardItem> to render each row. */
const ManageAccountsAdmin = () => {
  const data = useTracker(() => {
    Meteor.subscribe('userData');
    return Meteor.users.find().fetch();
  });
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, allcards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(AllCards.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const cardItems = AllCards.collection.find({}).fetch();
    return {
      allcards: cardItems,
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
                <Col><h2 className="my-2">Admin</h2></Col>
                <Navbar expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav.Item><Nav.Link style={{ color: 'black' }} id="list-card-nav" as={NavLink} to="/admin" key="admin">View Cards</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link style={{ color: 'black' }} id="add-card-nav" as={NavLink} to="/add" key="add">Add Card</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link style={{ color: 'black' }} id="manage-accounts-admin-nav" as={NavLink} to="/adminmanage" key="adminmanage">Accounts</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link style={{ color: 'black' }} id="settings-admin-nav" as={NavLink} to="/settings" key="settings">Settings</Nav.Link></Nav.Item>
                  </Navbar.Collapse>
                </Navbar>
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
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>User Since</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user) => (<AccountItem account={user} />))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Col>
      ) : ('')}
    </Col>
  ) : <LoadingSpinner />);
};

export default ManageAccountsAdmin;
