/**
 * Calculates the winner of a tic-tac-toe game.
 *
 * @param {Array} squares - An array of length 9 representing the state of the tic-tac-toe board.
 * @return {string|null} The winning player's symbol (X or O) or null if there is no winner.
 */
export function calculateWinner(squares) {
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

    /**
   * Checks if the tic-tac-toe game is a draw.
   *
   * @param {Array} squares - An array of length 9 representing the state of the tic-tac-toe board.
   * @return {boolean} True if the game is a draw, false otherwise.
   */
  export function isDraw(squares) {
    return squares.every(square => square !== null);
  }