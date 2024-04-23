import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const TradeItem = ({ tcard }) => (
  <tr>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <img src={tcard.image} alt={tcard.cardName} id="prof-icon" />
    </td>
    <td>{tcard.cardName}</td>
    <td>{tcard.type}</td>
    <td>{tcard.owner}</td>
    <td>
      <Link to={`/offer/${tcard._id}`}>Make Offer</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
TradeItem.propTypes = {
  tcard: PropTypes.shape({
    cardName: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    owner: PropTypes.string,
    isListedForTrade: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default TradeItem;
