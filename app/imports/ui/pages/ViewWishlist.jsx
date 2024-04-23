import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Form, InputGroup, Nav, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import RareCardWishlist from '../components/Rare-Card-Wishlist';
import { WishlistCard } from '../../api/wishcard/WishlistCard';
import CommonCardWishlist from '../components/Common-Card-Wishlist';
import LegendaryCardWishlist from '../components/Legendary-Card-Wishlist';
import { CatalogCard } from '../../api/cardcatalog/CatalogCard';

const ViewCardsAdmin = () => {
  const { ready: wishListReady, wishcard } = useTracker(() => {
    const adminSubscription = Meteor.subscribe(WishlistCard.adminPublicationName);
    const userSubscription = Meteor.subscribe(WishlistCard.userPublicationName);
    const rdy = userSubscription.ready() && adminSubscription.ready();
    const cardItems = WishlistCard.collection.find({}).fetch();
    return {
      wishcard: cardItems,
      ready: rdy,
    };
  }, []);

  const { ready: cardCatalogReady, cardcatalog } = useTracker(() => {
    const adminSubscription = Meteor.subscribe(CatalogCard.adminPublicationName);
    const userSubscription = Meteor.subscribe(CatalogCard.userPublicationName);
    const rdy = userSubscription.ready() && adminSubscription.ready();
    const cards = CatalogCard.collection.find({}).fetch();
    return {
      cardcatalog: cards,
      ready: rdy,
    };
  }, []);

  const addToWishlist = (cardId) => {
    const card = cardcatalog.find(item => item._id === cardId);
    if (card) {
      WishlistCard.addCard({
        ...card,
      }, (error, result) => {
        if (error) {
          if (error.code === 11000) {
            console.error('Duplicate key error: This card is already in the wishlist');
          } else {
            console.error('Error adding card to wishlist:', error);
          }
        } else {
          console.log('Card added to wishlist:', result);
        }
      });
    } else {
      console.log('Card does not exist in the catalog');
    }
  };

  return (wishListReady && cardCatalogReady ? (
    <Col>

      <Container fluid className="py-3" id="title-block">
        <Container>
          <Nav variant="pills">
            <Col><h2>Wishlist</h2></Col>
          </Nav>
        </Container>
      </Container>

      <Container className="justify-content-center py-5">
        <Col className="p-3">
          {/* eslint-disable-next-line no-shadow */}
          <Row className="justify-content-center">{wishcard.map((wishcard) => (
            wishcard.type === 'Common' ? (
              <CommonCardWishlist key={wishcard._id} card={wishcard} inWishlist />
            ) : null
          ))}
          </Row>
        </Col>
        <Col>
          {/* eslint-disable-next-line no-shadow */}
          <Row className="justify-content-center">        {wishcard.map((wishcard) => (
            wishcard.type === 'Rare' ? (
              <RareCardWishlist key={wishcard._id} card={wishcard} inWishlist />

            ) : null
          ))}
          </Row>
        </Col>
        <Col>
          {/* eslint-disable-next-line no-shadow */}
          <Row className="justify-content-center"> {wishcard.map((wishcard) => (
            wishcard.type === 'Legendary' ? (
              <LegendaryCardWishlist key={wishcard._id} card={wishcard} inWishlist />
            ) : null
          ))}
          </Row>
        </Col>
      </Container>

      <Container fluid className="py-3" id="title-block">
        <Container>
          <Nav variant="pills">
            <Col><h2>Card Catalog</h2></Col>
          </Nav>
        </Container>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Row className="py-4" style={{ width: '400px' }}>
            <InputGroup>
              <Form.Control id="SearchBar" placeholder="Name" />
              <Button variant="success">Search</Button>
            </InputGroup>
          </Row>
        </Row>
      </Container>

      <Col className="py-5">
        <Container>
          <Row>
            <Col>
              {/* eslint-disable-next-line no-shadow */}
              <Row className="justify-content-center">{cardcatalog.map((cardcatalog) => (
                cardcatalog.type === 'Common' ? (
                  <CommonCardWishlist key={cardcatalog._id} card={cardcatalog} addToWishlist={addToWishlist} inWishlist={false} />
                ) : null
              ))}
              </Row>
            </Col>
            <Col>
              {/* eslint-disable-next-line no-shadow */}
              <Row className="justify-content-center">{cardcatalog.map((cardcatalog) => (
                cardcatalog.type === 'Rare' ? (
                  <RareCardWishlist key={cardcatalog._id} card={cardcatalog} addToWishlist={addToWishlist} inWishlist={false} />
                ) : null
              ))}
              </Row>
            </Col>
            <Col>
              {/* eslint-disable-next-line no-shadow */}
              <Row className="justify-content-center">{cardcatalog.map((cardcatalog) => (
                cardcatalog.type === 'Legendary' ? (
                  <LegendaryCardWishlist
                    key={cardcatalog._id}
                    card={cardcatalog}
                    addToWishlist={addToWishlist}
                    inWishlist={false}
                  />
                ) : null
              ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Col>

  ) : <LoadingSpinner />);
};

export default ViewCardsAdmin;
