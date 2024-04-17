import React from 'react';
import { Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import { NavLink } from 'react-router-dom';
import { TCards } from '../../api/tcard/TCard';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  course: String,
  power: Number,
  type: {
    type: String,
    allowedValues: ['Common', 'Rare', 'Legendary'],
  },
  role: {
    type: String,
    allowedValues: ['Professor', 'Instructor'],
  },
  title: String,
  description: String,
  funFact: String,
  cardName: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddCard page for adding a document. */
const AddCard = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, course, power, type, role, title, description, funFact, cardName, image } = data;
    const owner = Meteor.user().username;
    TCards.collection.insert(
      { firstName, lastName, course, power, type, role, title, description, funFact, cardName, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
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
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card id="addCard">
                <Card.Body>
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
                </Card.Body>
              </Card>
            </AutoForm>
          </Container>
        </Col>
      ) : (
        <Container className="py-3">
          <Row className="justify-content-center">
            <Col xs={5}>
              <Col className="text-center"><h2>Add Stuff</h2></Col>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                <Card>
                  <Card.Body>
                    <TextField name="firstName" />
                    <TextField name="lastName" />
                    <TextField name="course" />
                    <TextField name="type" />
                    <TextField name="title" />
                    <TextField name="description" />
                    <TextField name="funFact" />
                    <TextField name="cardName" />
                    <NumField name="power" decimal={null} />
                    <SubmitField value="Submit" />
                    <ErrorsField />
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
          </Row>
        </Container>
      )}
    </Col>
  );
};

export default AddCard;
