import { useEffect, useState } from "react";
import './ScoreBoard.scss';

type Props = {
  winner: 'X' | 'O' | null;
};

export const ScoreBoard: React.FC<Props> = ({ winner }) => {
  const [countX, setCountX] = useState(0);
  const [countO, setCountO] = useState(0);

  useEffect(
    () => {
      if (winner === 'X') {
        setCountX(countX + 1);
      }

      if (winner === 'O') {
        setCountO(countO + 1);
      }
    },
    [winner],
  );

  return (
    <div className="ScoreBoard">
      <div className="ScoreBoard__score">
        <b>X</b>
        {countX 
          ? countX
          : '-'
        }
      </div> 
      <div className="ScoreBoard__score">
        <b>O</b>
        {countO
          ? countO
          : '-'
        }
      </div>
    </div>
  );
};
