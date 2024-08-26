import React, { useState } from "react";
import Board from "./Board";
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

const GameInfoContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
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
/**
 * A functional component representing the Tic Tac Toe game.
 *
 * @return {JSX.Element} The JSX element representing the game.
 */
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
