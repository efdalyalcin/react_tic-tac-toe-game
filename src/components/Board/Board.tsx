import React, { useEffect, useState } from 'react';
import { Squares } from '../Squares/Squares';
import './Board.scss';
import { calculateWinner, lookForComputerWin, lookForWinningIndex } from '../helper';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { Toggler } from '../Toggler/Toggler';

export const Board: React.FC = () => {
  const [boardSquares, setBoardSquares]
    = useState<('X' | 'O' | null)[]>(Array(9).fill(null));

  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isCompFirstPlay, setIsCompFirstPlay] = useState(true);
  const [isToggledToHard, setIsToggledToHard] = useState(false);

  const handleClick = (index: number) => {
    const squares = [...boardSquares];

    if (calculateWinner(boardSquares) || squares[index]) return;

    squares[index] = isXNext ? 'X' : 'O';

    setBoardSquares(squares);
    setIsXNext(!isXNext);
  }

  const handleIsChecked = () => {
    setIsToggledToHard(!isToggledToHard);
  };

  const renderSquare = (index: number) => (
    <Squares 
      value={boardSquares[index]}
      onClick={() => handleClick(index)}
    />
  );

  const nextPlayerHandler = (
    isXNext
      ? 'Next player: X'
      : 'Next player: O'
  );

  const handleReplay = () => {
    setBoardSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setIsCompFirstPlay(true);
  };

  useEffect(
    () => {
      const putComputerAt = (index: number) => {
        const squares = [...boardSquares];
        squares[index] = 'O';
        setBoardSquares([...squares]);
      };
    
      const getFreeIndexes = () => {
        const freeIndixes = boardSquares.map((square, index: number) => square === null ? index : null);
        const freeIndexNums: number[] = freeIndixes.filter((index): index is number => {
          return index !== null;
        });
    
        return freeIndexNums;
      };
    
      const checkWinner = () => {
        const isThereWinner = calculateWinner(boardSquares);
    
        if (isThereWinner) {
          setWinner(isThereWinner);
          return isThereWinner;
        }
    
        if (!boardSquares.includes(null)) {
          setIsDraw(true);
        }
      };

      const firstComputerPlay = () => {
        if (boardSquares[4] === null) {
          putComputerAt(4);
          setIsXNext(true);
        } else {
          const cornerIndexes = [0, 2, 6, 8];
          const randomIndex = Math.floor(Math.random() * 4);

          putComputerAt(cornerIndexes[randomIndex]);
          setIsXNext(true);
        }
      };
    
      const isWinner = checkWinner();
    
      if (!isXNext && !isWinner) {
        const freeIndexNums = getFreeIndexes();
        const winningPosition = lookForWinningIndex(boardSquares);
        const computerWinningPos = lookForComputerWin(boardSquares);

        if (isToggledToHard && isCompFirstPlay) {
          firstComputerPlay();
          setIsCompFirstPlay(false);
        } else if (computerWinningPos !== null) {
          putComputerAt(computerWinningPos);
          setIsXNext(true);
        } else if (winningPosition !== null) {
          putComputerAt(winningPosition);
          setIsXNext(true);
        } else {
          const randomIndex: number = freeIndexNums[Math.floor(Math.random() * freeIndexNums.length)];
      
          putComputerAt(randomIndex);
          setIsXNext(true);
        }
      }
    },
    [boardSquares, isXNext, winner, isCompFirstPlay, isToggledToHard],
  );

  return (
    <div className="Board">
      <Toggler isChecked={isToggledToHard} handleIsChecked={handleIsChecked}/>
      <ScoreBoard winner={winner} />

      <h2 className="Board__title">
        {isDraw 
          ? 'It is a draw' 
          : winner
            ? `Winner is ${winner}`
            : nextPlayerHandler
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
