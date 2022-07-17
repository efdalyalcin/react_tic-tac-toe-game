import React from 'react';
import './App.scss';
import { Board } from './components/Board/Board';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Board />
    </div>
  );
}
