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

  const handleReplay = () => {
    setBoardSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(boardSquares);

  const resultOfGame = (winPlayer: 'X' | 'O' | null) => {
    if (winner) {
      return (`Winner is ${winPlayer}`);
    }
     
    if (!boardSquares.includes(null)) {
      return ("It is a draw");
    }
  };

  const putComputerAt = (index: number) => {
    const squares = [...boardSquares];
    squares[index] = 'O';
    setBoardSquares([...squares]);
  };

  if (!isXNext) {
    const freeIndixes = boardSquares.map((square, index: number) => square === null ? index : null);
    const freeIndexNums: number[] = freeIndixes.filter((index): index is number => {
      return index !== null;
    });

    const randomIndex: number = freeIndexNums[Math.floor(Math.random() * freeIndexNums.length)];

    putComputerAt(randomIndex);
    setIsXNext(true);
  }

  // const xIndices = boardSquares.reduce((acc, square, i) => {
  //   if (square === "X") {
  //     acc.push(i);
  //   }

  //   return acc;
  // }, []);

  // const freeIndices = boardSquares.filter((square) => square === null);

  // const currentWinningLines = winningLines.filter(
  //   (line) => !line.some((i) => xIndices.includes(i))
  // );

  return (
    <div className="Board">
      <h2 className="Board__title">
        {winner
          ? resultOfGame(winner)
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

      <button 
        type="button"
        onClick={handleReplay}
        className="Board__replay-button"
      >
        Play again
      </button>
    </div>
  );
};
