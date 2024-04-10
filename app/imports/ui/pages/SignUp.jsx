import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <div className="pt-5">
      <Container id="signup-page" className="pt-5">
        <Row className="justify-content-center">
          <Col xs={5}>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <Card id="input-card-body">
                <Card.Body>
                  <h2 className="text-center">Register your account</h2>
                  <TextField name="email" placeholder="E-mail address" />
                  <TextField name="password" placeholder="Password" type="password" />
                  <ErrorsField />
                  <SubmitField />
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    Already have an account? Login
                    {' '}
                    <Link to="/signin" style={{ color: '#95bea9' }}>here</Link>
                  </div>
                </Card.Body>
              </Card>
            </AutoForm>
            {error === '' ? (
              ''
            ) : (
              <Alert variant="danger">
                <Alert.Heading>Registration was not successful</Alert.Heading>
                {error}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
