import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Offers } from '../../api/trade/Offer'; // Import Offers collection

const bridge = new SimpleSchema2Bridge(Offers.schema); // Use the schema from Offers collection

/* Renders the MakeOffer page for making a trade offer. */
const MakeOffer = () => {
  const { _id } = useParams();

  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Offers.userPublicationName);
    const rdy = subscription.ready();
    const document = Offers.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { senderId, recipientId, offeredCardName, offeredCardImage, message } = data;
    Offers.collection.insert(_id, { $set: { senderId, recipientId, offeredCardName, offeredCardImage, message } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Offer made successfully', 'success')));
  };

  return ready ? (
    <Col>
      <Container fluid className="py-3" id="title-block">
        <Container>
          <h2 className="text-center pt-2">MARKETPLACE</h2>
          <p className="text-center">Trade Cards here!</p>
        </Container>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Make Offer</h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Card>
                <Card.Body>
                  <TextField name="message" />
                  <SelectField name="card" />
                  <SubmitField value="Submit" />
                  <ErrorsField />
                  <HiddenField name="owner" />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </Col>
  ) : <LoadingSpinner />;
};

export default MakeOffer;
