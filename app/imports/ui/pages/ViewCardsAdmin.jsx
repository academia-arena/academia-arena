import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
// import CommonCard from '../components/Common-Card';
// import RareCard from '../components/Rare-Card';
// import LegendaryCard from '../components/Legendary-Card';
import { AllCards } from '../../api/allcard/AllCard';
import ThisCard from '../components/Card';

const getFilteredCards = (query, tcards) => {
  if (!query) {
    return tcards;
  }
  return tcards.filter((card) => card.firstName.includes(query) || card.firstName.toLowerCase().includes(query) || card.lastName.includes(query) || card.lastName.toLowerCase().includes(query));
};
/* Renders a table containing all of the Stuff documents. Use <CardItem> to render each row. */
const ViewCardsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [query, setQuery] = useState('');
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
  const filteredCards = getFilteredCards(query, allcards);
  function handleChange(e) {
    setQuery(e.target.value);
  }
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
            <Row className="py-4 justify-content-center">
              <input type="text" onChange={handleChange} className="search-bar" placeholder="Search by Professor's first or last name" />
            </Row>
            {/* Uses one component for card (Card.jsx)  */}
            <Row style={{ paddingLeft: '6vh' }} className="py-4 gx-2 justify-content-center">
              {
                filteredCards.map((tcard) => {
                  if (tcard.type === 'Common') return <Col><ThisCard key={tcard._id} card={tcard} background={commonBackground} title={commonTitle} image={commonImage} text={commonText} /></Col>;
                  if (tcard.type === 'Rare') return <Col><ThisCard key={tcard._id} card={tcard} background={rareBackground} title={rareTitle} image={rareImage} text={rareText} /></Col>;
                  return <Col><ThisCard key={tcard._id} card={tcard} background={legendaryBackground} title={legendaryTitle} image={legendaryImage} text={legendaryText} /></Col>;
                })
              }
            </Row>
          </Container>
          {/* <Col className="py-5">
            <Container>
              <Row>
                <Col>
                  <Row className="justify-content-center">{allcards.map((allcard) => (allcard.type === 'Common' ? (<CommonCard key={allcard._id} card={allcard} />) :
                    ('')))}
                  </Row>
                </Col>
                <Col>
                  <Row className="justify-content-center">{allcards.map((allcard) => (allcard.type === 'Rare' ? (<RareCard key={allcard._id} card={allcard} />) :
                    ('')))}
                  </Row>
                </Col>
                <Col>
                  <Row className="justify-content-center">{allcards.map((allcard) => (allcard.type === 'Legendary' ? (<LegendaryCard key={allcard._id} card={allcard} />) :
                    ('')))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col> */}
        </Col>
      ) : ('')}
    </Col>
  ) : <LoadingSpinner />);
};

export default ViewCardsAdmin;
