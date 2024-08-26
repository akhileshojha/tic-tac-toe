// gameLogic.test.js
import { calculateWinner, isDraw } from './gameLogic';

describe('calculateWinner', () => {
  test('should return X as the winner', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('should return O as the winner', () => {
    const squares = [null, null, null, 'O', 'O', 'O', null, null, null];
    expect(calculateWinner(squares)).toBe('O');
  });

  test('should return null when there is no winner', () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBeNull();
  });

  test('should return X as the winner for diagonal', () => {
    const squares = ['X', null, 'O', null, 'X', 'O', null, null, 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('should return null when there is no winner yet', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(calculateWinner(squares)).toBeNull();
  });
});