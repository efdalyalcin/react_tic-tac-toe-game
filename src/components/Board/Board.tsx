import React, { useState } from 'react';
import { Squares } from '../Squares/Squares';
import './Board.scss';
import { calculateWinner } from '../helper';

export const Board: React.FC = () => {
  const [boardSquares, setBoardSquares]
    = useState<("X" | "O" | null)[]>(Array(9).fill(null));

  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    const squares = [...boardSquares];

    if (calculateWinner(boardSquares) || squares[index]) return;

    squares[index] = isXNext ? 'X' : 'O';

    setBoardSquares(squares);
    setIsXNext(!isXNext);
  }

  const renderSquare = (index: number) => (
    <Squares 
      value={boardSquares[index]}
      onClick={() => handleClick(index)}
    />
  );

  const winner = calculateWinner(boardSquares);

  return (
    <div className="Board">
      <h2 className="Board__title">
        {winner
          ? `Winner is ${winner}`
          : isXNext
            ? 'Next player: X'
            : 'Next player: O'
        }
      </h2>

      <div className="Board__row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="Board__row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>

      <div className="Board__row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
