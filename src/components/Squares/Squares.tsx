import React from 'react';
import cn from 'classnames';
import './Squares.scss';

type Props = {
  onClick: () => void;
  value: 'X' | 'O' | null;
}

export const Squares: React.FC<Props> = (
  { onClick, value}
) => {
  const handleClassname = () => {
    if (value !== null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <button
      type="button"
      className={cn('Square', {'Square--filled': handleClassname()})}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
