import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { AllCards } from '../../api/allcard/AllCard';

const bridge = new SimpleSchema2Bridge(AllCards.schema);

/* Renders the EditStuff page for editing a single document. */
const ListForTrade = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(AllCards.userPublicationName);
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
    const { isListedForTrade } = data;
    AllCards.collection.update(_id, { $set: { isListedForTrade } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Listed successfully')));
  };

  return ready ? (
    <Col>
      <Container fluid className="py-3" id="title-block">
        <Container>
          <h2 className="text-center pt-2">List your card on the Marketplace?</h2>
        </Container>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Card>
                <Card.Body>
                  <SelectField name="isListedForTrade" label="List For Trade?" />
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

export default ListForTrade;
