export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const calculateWinner = (squares: ('X' | 'O' | null)[]) => {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export const lookForWinningIndex = (squares: ('X' | 'O' | null)[]) => {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[c] === null) {
      return c;
      // return [squares[a], c];
    }

    if (squares[b] && squares[c] === squares[b] && squares[a] === null) {
      return a;
      // return [squares[b], a];
    }

    if (squares[c] && squares[a] === squares[c] && squares[b] === null) {
      return b;
      // return [squares[c], b];
    }
  }

  return null;
};
