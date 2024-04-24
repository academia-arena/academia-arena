import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List card table. See pages/ViewCardsAdmin.jsx. */
const CardItem = ({ card }) => (
  <tr>
    <th>{card.owner}</th>
    <td>
      {/* <Link to={`/each/${card._id}`}>View Cards Owned By This Account</Link> */}
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
    owner: PropTypes.string,
  }).isRequired,
};

export default CardItem;
