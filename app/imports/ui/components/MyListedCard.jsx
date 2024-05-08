import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const MyListedCard = ({ tcard, onUnlistClick }) => {
  const handleUnlistButton = () => {
    // Call the onUnlistClick function passed from the parent component
    onUnlistClick(tcard);
  };
  return (
    <tr>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <img src={tcard.image} alt={tcard.cardName} id="prof-icon" />
      </td>
      <td>{tcard.cardName}</td>
      <td>{tcard.type}</td>
      <td>{tcard.owner}</td>
      <td>
        {/* Pass the handleObtainClick function to the onClick event */}
        <Button id="unlist-button" onClick={handleUnlistButton}>Unlist Card</Button>
      </td>
    </tr>
  );
};

MyListedCard.propTypes = {
  tcard: PropTypes.shape({
    cardName: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    owner: PropTypes.string,
    isListedForTrade: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onUnlistClick: PropTypes.func.isRequired, // Define the onObtainClick prop as a function
};

export default MyListedCard;
