import React from 'react';
import PropTypes from 'prop-types';

const MyListedCard = ({ tcard }) => (
  <tr>
    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <img src={tcard.image} alt={tcard.cardName} id="prof-icon" />
    </td>
    <td>{tcard.cardName}</td>
    <td>{tcard.type}</td>
    <td>{tcard.owner}</td>
  </tr>
);

MyListedCard.propTypes = {
  tcard: PropTypes.shape({
    cardName: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    owner: PropTypes.string,
    isListedForTrade: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default MyListedCard;
