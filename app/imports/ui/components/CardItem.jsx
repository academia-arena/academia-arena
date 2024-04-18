import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List card table. See pages/ViewCardsAdmin.jsx. */
const CardItem = ({ card }) => (
  <tr>
    <th>{card.firstName}</th>
    <th>{card.lastName}</th>
    <th>{card.course}</th>
    <th>{card.type}</th>
    <th>{card.title}</th>
    <th>{card.description}</th>
    <th>{card.funFact}</th>
    <th>{card.cardName}</th>
    <th>{card.power}</th>
    <td>
      <Link to={`/edit/${card._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
CardItem.propTypes = {
  card: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    course: PropTypes.string,
    type: PropTypes.string,
    role: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    funFact: PropTypes.string,
    cardName: PropTypes.string,
    image: PropTypes.string,
    power: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default CardItem;
