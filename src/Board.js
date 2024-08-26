import React from "react";
import Square from "./Square";
import { calculateWinner } from "./gameLogic";
import styled from "@emotion/styled";

const BoardWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 2px;
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
/**
 * Renders a Tic-Tac-Toe board with the given state.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.xIsNext - Indicates if it's X's turn.
 * @param {Array<string>} props.squares - The current state of the board.
 * @param {Function} props.onPlay - The callback function to handle a play.
 * @return {JSX.Element} The rendered Tic-Tac-Toe board.
 */
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

export default Board;