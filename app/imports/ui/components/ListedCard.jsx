import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ListedCard = ({ card, onObtainClick }) => {
  const handleObtainClick = () => {
    // Call the onObtainClick function passed from the parent component
    onObtainClick(card);
  };

  return (
    <tr>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <img src={card.image} alt={card.cardName} id="prof-icon" />
      </td>
      <td>{card.cardName}</td>
      <td>{card.type}</td>
      <td>{card.owner}</td>
      <td>
        {/* Pass the handleObtainClick function to the onClick event */}
        <Button id="obtain-button" onClick={handleObtainClick}>Obtain Card</Button>
      </td>
    </tr>
  );
};

ListedCard.propTypes = {
  card: PropTypes.shape({
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
