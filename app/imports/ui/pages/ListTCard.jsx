import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { TCards } from '../../api/tcard/TCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ThisCard from '../components/Card';

/* Search bar code from tutorial by Carmelle Codes on Youtube */
const getFilteredCards = (query, tcards) => {
  if (!query) {
    return tcards;
  }
  return tcards.filter((card) => card.firstName.includes(query) || card.firstName.toLowerCase().includes(query) || card.lastName.includes(query) || card.lastName.toLowerCase().includes(query));
};

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListTCard = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [query, setQuery] = useState('');
  const { ready, tcards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(TCards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const tcardItems = TCards.collection.find({}).fetch();
    return {
      tcards: tcardItems,
      ready: rdy,
    };
  }, []);
  const filteredCards = getFilteredCards(query, tcards);
  const commonBackground = 'Cards1';
  const commonTitle = 'CardsTitle1';
  const commonImage = 'CardsImage1';
  const commonText = 'CardsText1';
  const rareBackground = 'Cards2';
  const rareTitle = 'CardsTitle2';
  const rareImage = 'CardsImage2';
  const rareText = 'CardsText2';
  const legendaryBackground = 'Cards3';
  const legendaryTitle = 'CardsTitle3';
  const legendaryImage = 'CardsImage3';
  const legendaryText = 'CardsText3';
  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (ready ? (
    <Col id="view-collection-page">
      <Container fluid className="py-3" id="title-block">
        <Container>
          <h2 className="text-center pt-2">My Card Collection</h2>
        </Container>
      </Container>
      <Container className="py-3 justify-content-center">
        <Row className="py-3 d-flex justify-content-center">
          <input type="text" onChange={handleChange} className="search-bar" placeholder="Search by Professor's first or last name" />
          <Row style={{ paddingLeft: '6vh' }} className="py-3 gx-2 justify-content-center">
            {
              filteredCards.map((tcard) => {
                if (tcard.type === 'Common') return <Col><ThisCard key={tcard._id} card={tcard} background={commonBackground} title={commonTitle} image={commonImage} text={commonText} /></Col>;
                if (tcard.type === 'Rare') return <Col><ThisCard key={tcard._id} card={tcard} background={rareBackground} title={rareTitle} image={rareImage} text={rareText} /></Col>;
                return <Col><ThisCard key={tcard._id} card={tcard} background={legendaryBackground} title={legendaryTitle} image={legendaryImage} text={legendaryText} /></Col>;
              })
            }
          </Row>
        </Row>
      </Container>
    </Col>
  ) : <LoadingSpinner />);
};

export default ListTCard;
