import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ListedCard = ({ tcard, onObtainClick }) => {
  const handleObtainClick = () => {
    // Call the onObtainClick function passed from the parent component
    onObtainClick(tcard);
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
        <Button onClick={handleObtainClick}>Obtain Card</Button>
      </td>
    </tr>
  );
};

ListedCard.propTypes = {
  tcard: PropTypes.shape({
    cardName: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    owner: PropTypes.string,
    isListedForTrade: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onObtainClick: PropTypes.func.isRequired, // Define the onObtainClick prop as a function
};

export default ListedCard;
