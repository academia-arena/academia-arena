import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Offers } from '../../api/trade/Offer';
import { TCards } from '../../api/tcard/TCard'; // Import Offers collection

const bridge = new SimpleSchema2Bridge(Offers.schema); // Use the schema from Offers collection

/* Renders the MakeOffer page for making a trade offer. */
const MakeOffer = () => {
  const { _id } = useParams(); // This is the ID of the card being offered for trade

  const { cards, doc, ready } = useTracker(() => {
    const handle = Meteor.subscribe(TCards.userPublicationName);
    const userData = TCards.collection.find({ owner: Meteor.userId() }).fetch();
    const subscription = Meteor.subscribe(Offers.userPublicationName);
    const rdy = subscription.ready();
    const document = Offers.collection.findOne({ _id }); // Fetching the card to offer for trade
    return {
      cards: userData,
      doc: document,
      ready: rdy && handle.ready(),
    };
  }, []);

  const submit = (data) => {
    const { message, senderCardId } = data; // Get the selected card ID from the form data
    const selectedCard = cards.find(card => card._id === senderCardId); // Find the selected card from the array
    if (!selectedCard) {
      swal('Error', 'Please select a card', 'error');
      return;
    }
    Offers.collection.insert({
      senderId: Meteor.userId(),
      senderCardId, // Use the selected card ID
      recipientId: doc.owner,
      offeredCardName: selectedCard.cardName, // Use the selected card's properties
      offeredCardImage: selectedCard.image,
      requestedCardId: doc._id,
      message,
      status: 'pending',
      createdAt: new Date(),
    }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Offer made successfully', 'success')));
  };

  const options = cards.map(card => ({
    label: card.cardName,
    value: card._id,
  }));

  return ready ? (
    <Col>
      <Container fluid className="py-3" id="title-block">
        <Container>
          <h2 className="text-center pt-2">Make an offer for this card!</h2>
        </Container>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Card>
                <Card.Body>
                  <TextField name="message" label="Message" />
                  <SelectField name="senderCardId" label="Select Offer Card" options={options} />
                  <SubmitField value="Submit" />
                  <ErrorsField />
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
