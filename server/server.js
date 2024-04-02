const express = require('express');
const cors = require('cors');
const { calculateWinner, isTie } = require('./gameLogic');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

let gameState = {
  board: Array(9).fill(null),
  xIsNext: true
};

app.post('/move', (req, res) => {
  const { index, player } = req.body;
  if (!isValidMove(index, player)) {
    gameState.xIsNext = !gameState.xIsNext;
    return res.status(400).send({ message: 'Invalid move', gameState });
  }

  makeMove(index);
  const winner = calculateWinner(gameState.board);

  if (winner) {
    gameState = { board: Array(9).fill(null), xIsNext: true };
    return res.send({ message: `Game over, ${winner} wins!`, gameState });
  } else if (isTie(gameState.board)) {
    gameState = { board: Array(9).fill(null), xIsNext: true };
    return res.send({ message: 'Game over, it\'s a tie!', gameState });
  }

  gameState.xIsNext = !gameState.xIsNext;
  res.send({ message: 'Valid move', gameState });
});

app.post('/reset', (req, res) => {
    gameState = { board: Array(9).fill(null), xIsNext: true };
    res.send({ message: 'Game reset successfully', gameState });
  });

const isValidMove = (index) => {
  return index >= 0 && index < 9 && !gameState.board[index];
};

const makeMove = (index) => {
  gameState.board[index] = gameState.xIsNext ? 'X' : 'O';
};

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
