import React, { useState, useEffect } from 'react';
import './Sudoku-game.css';

const generateSudoku = () => {
  return [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];
};

const isValid = (grid, row, col, value) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value || grid[i][col] === value) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (grid[i][j] === value) return false;
    }
  }
  return true;
};

const Sudoku = () => {
  const [grid, setGrid] = useState(generateSudoku());
  const [selectedCell, setSelectedCell] = useState(null);
  const [warning, setWarning] = useState('');
  const [invalidCells, setInvalidCells] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumberInput = (value) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      const newGrid = [...grid];
      const newInvalidCells = [...invalidCells];

      if (isValid(grid, row, col, value)) {
        newGrid[row][col] = value;
        setScore(score + 10);
        setWarning('');
        setInvalidCells(newInvalidCells.filter(cell => cell.row !== row || cell.col !== col));
      } else {
        setWarning('This number is not valid in this position!');
        newInvalidCells.push({ row, col });
        setInvalidCells(newInvalidCells);
      }
      setGrid(newGrid);
    } else {
      setWarning('Please select a cell first.');
    }
  };

  const renderCell = (value, row, col) => {
    const isInvalid = invalidCells.some(cell => cell.row === row && cell.col === col);
    const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col;

    return (
      <div
        key={`${row}-${col}`}
        className={`sudoku-cell ${isInvalid ? 'red-border' : ''} ${isSelected ? 'selected-cell' : ''}`}
        onClick={() => setSelectedCell([row, col])}
      >
        {value !== 0 ? value : ''}
      </div>
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="sudoku-container">
      <div className="sudoku-info">
        <div>Time: {formatTime(time)}</div>
        <div>Score: {score}</div>
      </div>
      <div className="sudoku-board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </div>
        ))}
      </div>
      <div className="number-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button key={num} onClick={() => handleNumberInput(num)}>
            {num}
          </button>
        ))}
      </div>
      {warning && <div className="warning-message">{warning}</div>}
    </div>
  );
};

export default Sudoku;
