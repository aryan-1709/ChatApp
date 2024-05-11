import React from 'react';

const Box = ({ width, height, backgroundColor, children }) => {
  const boxStyle = {
    width: width || '500px',
    height: height || '500px',
    backgroundColor: backgroundColor || 'lightblue',
    padding: '50px',
    border: '0px solid black',
    borderRadius: '5px',
  };

  return (
    <div style={boxStyle}>
      {children}
    </div>
  );
};

export default Box;