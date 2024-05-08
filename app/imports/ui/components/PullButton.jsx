import React from 'react';
import PropTypes from 'prop-types';

const PullButton = ({ score, resetScore }) => (
  <div>
    {score === 100 ? (
      <div>
        {/* eslint-disable-next-line react/button-has-type */}
        <button id="pull-button" className="pe-2" onClick={resetScore}>Pull Card!</button>
      </div>
    ) : (
      <div>
        {/* eslint-disable-next-line react/button-has-type */}
        <button id="no-pull-button" disabled>Need Points!</button>
      </div>
    )}
  </div>
);

PullButton.propTypes = {
  score: PropTypes.number.isRequired,
  resetScore: PropTypes.func.isRequired,
};

export default PullButton;