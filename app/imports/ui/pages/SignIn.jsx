import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/home" />);
  }
  // Otherwise return the Login form.
  return (
    <Col>
      <Container fluid className="py-3 text-center" id="title-block">
        <Container>
          <h2>Login Here</h2>
        </Container>
      </Container>
      <div id="page-container" className="pt-5">
        <Container id="signin-page" className="pt-5">
          <Row className="justify-content-center">
            <Col xs={5}>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Card>
                  <Card.Body id="input-card-body">
                    <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                    <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                    <ErrorsField />
                    <div className="d-flex justify-content-center">
                      <Button type="submit" id="signin-form-submit">Submit</Button>
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                      <Link to="/signup" style={{ color: 'black' }}>Click here to Register</Link>
                    </div>
                  </Card.Body>
                </Card>
              </AutoForm>
              {error === '' ? (
                ''
              ) : (
                <Alert variant="danger">
                  <Alert.Heading>Login was not successful</Alert.Heading>
                  {error}
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default SignIn;
