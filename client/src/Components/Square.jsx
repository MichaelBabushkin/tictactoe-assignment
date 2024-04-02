import React from 'react';
import '../Styles/Square.css';

const Square = ({ value, onClick }) => {
  return (
    <button className={`square ${value}`} onClick={onClick}>
        {value}
    </button>
  );
};

export default Square;
