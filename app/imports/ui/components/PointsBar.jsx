import React from 'react';

// code adapted from Katsiaryna Lupachova on GitHub
const PointsBar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { bgcolor, completed } = props;
  const containerStyles = {
    height: 25,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 25,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 20,
    marginLeft: 20,
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}`}</span>
      </div>
    </div>
  );
};

export default PointsBar;
