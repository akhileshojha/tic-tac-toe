import React from "react";
import styled from "@emotion/styled";

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
  
  &.highlight {
    background-color: yellow; /* Highlight background color */
    transform: scale(1.1); /* Slightly enlarge the highlighted square */
    border-color: orange; /* Optional: change border color */
  }

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
/**
 * A React component representing a square in a game board.
 *
 * @param {Object} props - The component props.
 * @param {string|null} props.value - The value to display in the square.
 * @param {function} props.onSquareClick - A callback function to call when the square is clicked.
 * @return {JSX.Element} The rendered square element.
 */
function Square({ value, onSquareClick, highlight = false }) {
  return <SquareWrapper className={`square ${highlight ? 'highlight' : ''}`} onClick={onSquareClick}>{value}</SquareWrapper>;
}

export default Square;
