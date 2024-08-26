import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #282c34;
  color: white;
`;
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #61dafb;
  animation: fadeIn 2s ease-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const BoardWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 2px;
`;
const SquareWrapper = styled.button`
  width: 100px;
  height: 100px;
  background-color: #61dafb;
  border: 1px solid #282c34;
  font-size: 2rem;
  color: #282c34;
  cursor: pointer;
  text-align: center;
  line-height: 100px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #21a1f1;
    transform: scale(1.1);
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }

  animation: bounceIn 0.6s;

  @keyframes bounceIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    60% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }
`;
const GameInfoContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
`;

const Status = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.5rem;
  color: #61dafb;
  background-color: transparent;
  border: 2px solid #61dafb;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideIn 1s ease-out;

  &:hover {
    background-color: #61dafb;
    color: #282c34;
    transform: translateY(-5px);
  }

  &:focus {
    outline: none;
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const MovesList = styled.ol`
  list-style-type: none;
  padding: 0;
  min-width: 200px;
  margin: 0 auto;
  width: 80%;
  animation: fadeInList 1.5s ease-out;

  @keyframes fadeInList {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MoveItem = styled.li`
  margin: 5px 0;
  animation: fadeInItem 0.5s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @keyframes fadeInItem {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const MoveButton = styled.button`
  background-color: transparent;
  border: 1px solid #61dafb;
  color: #61dafb;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #61dafb;
    color: #282c34;
  }

  &:focus {
    outline: none;
    border-color: #21a1f1;
  }
`;
function Square({ value, onSquareClick }) {
  return <SquareWrapper onClick={onSquareClick}>{value}</SquareWrapper>;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <Status>{status}</Status>
      <BoardWrapper>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </BoardWrapper>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <MoveItem key={move}>
        <MoveButton onClick={() => jumpTo(move)}>{description}</MoveButton>
      </MoveItem>
    );
  });

  return (
    <GameWrapper>
      <Title>Tic Tac Toe</Title>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <GameInfoContainer>
        <MovesList>{moves}</MovesList>
      </GameInfoContainer>
    </GameWrapper>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
