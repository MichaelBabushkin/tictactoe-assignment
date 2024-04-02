import React, { useState } from 'react';
import Board from './Board';
import '../Styles/Game.css';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Next player: X');
  const handleClick = async (i) => {

    try {
      const response = await fetch('http://localhost:3001/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: i, player: xIsNext ? 'X' : 'O'})
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSquares(data.gameState.board);
        setXIsNext(data.gameState.xIsNext);
        setStatus( `Next player: ${xIsNext ? 'O' : 'X'}`);
        if (data.message.includes('Game over')) {
            setStatus(`${data.message}`);
            alert(data.message);
        }
    } else {
        alert(data.message);
    }
    
} catch (error) {
      console.error('Error:', error);
    }
  };
  

  const resetGame = async () => {
    try {
      const response = await fetch('http://localhost:3001/reset', { method: 'POST' });
      const data = await response.json();
  
      if (response.ok) {
        setSquares(data.gameState.board);
        setXIsNext(data.gameState.xIsNext);
        setStatus('Next player: X');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="game">
        <div className="status">{status}</div>
        <Board squares={squares} onClick={handleClick} />
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Game;
