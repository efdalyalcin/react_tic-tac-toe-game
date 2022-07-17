import React from 'react';
import './Squares.scss';

type Props = {
  onClick: () => void;
  value: 'X' | 'O' | null;
}

export const Squares: React.FC<Props> = (
  { onClick, value}
) => {

  return (
    <button
      type="button"
      className="Square"
      onClick={onClick}
    >
      {value}
    </button>
  );
};
