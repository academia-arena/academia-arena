import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col>
      <Container fluid className="py-3 text-center" id="title-block">
        <Container>
          <h2>Sign Out</h2>
        </Container>
      </Container>
      <div className="signout-box">
        <Col id="signout-page" className="text-center py-3">
          <h2>You are signed out.</h2>
          <p>See you next time trainer!</p>
        </Col>
      </div>
    </Col>
  );
};

export default SignOut;
