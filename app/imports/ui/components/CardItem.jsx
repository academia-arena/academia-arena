import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ViewCardsAdmin.jsx. */
const CardItem = ({ stuff }) => (
  <tr>
    <th>{stuff.firstName}</th>
    <th>{stuff.lastName}</th>
    <th>{stuff.course}</th>
    <th>{stuff.type}</th>
    <th>{stuff.title}</th>
    <th>{stuff.description}</th>
    <th>{stuff.funFact}</th>
    <th>{stuff.cardName}</th>
    <th>{stuff.power}</th>
    <td>
      <Link to={`/edit/${stuff._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
CardItem.propTypes = {
  stuff: PropTypes.shape({
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
