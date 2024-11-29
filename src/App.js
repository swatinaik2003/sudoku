
// src/App.js
import React from 'react';
import './App.css';
import Sudoku from './components/Sudoku-game';

function App() {
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <Sudoku />
    </div>
  );
}

export default App;
