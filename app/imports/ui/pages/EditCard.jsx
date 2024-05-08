import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { AllCards } from '../../api/allcard/AllCard';

const bridge = new SimpleSchema2Bridge(AllCards.schema);

/* Renders the EditStuff page for editing a single document. */
const EditCard = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(AllCards.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = AllCards.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, course, power, type, title, description, funFact, cardName, image } = data;
    AllCards.collection.update(_id, { $set: { firstName, lastName, course, power, type, title, description, funFact, cardName, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
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
      <Container className="w-50 py-5">
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Card id="editCard">
            <Card.Body>
              <h2 className="text-center">Edit Card</h2>
              <TextField name="cardName" />
              <TextField placeholder="Link" name="image" />
              <Row>
                <Col><SelectField placeholder="Type of Card" name="type" /></Col>
                <Col><SelectField name="role" /></Col>
              </Row>
              <Row>
                <Col><TextField name="firstName" /></Col>
                <Col><TextField name="lastName" /></Col>
              </Row>
              <Row>
                <Col><TextField placeholder="Special Attack Title" name="title" /></Col>
                <Col>
                  <Row>
                    <Col><NumField name="power" decimal={null} /></Col>
                    <Col><TextField name="course" /></Col>
                  </Row>
                </Col>
              </Row>
              <LongTextField placeholder="Special Attack Description" name="description" />
              <LongTextField name="funFact" />
              <SubmitField value="Submit" />
              <ErrorsField />
              <HiddenField name="owner" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Container>
    </Col>
  ) : <LoadingSpinner />;
};

export default EditCard;
