import React, { useState } from "react";
import "./App.css";

/**
 * Returns "X" or "O" if there's a winner, or "draw" if all cells are filled and no winner.
 * @param {string[]} squares 1D array 0..8 for grid (flattened)
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]; // "X" or "O"
    }
  }
  return squares.every((sq) => sq) ? "draw" : null;
}

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const currentPlayer = xIsNext ? "X" : "O";

  // PUBLIC_INTERFACE
  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderSquare(i) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleClick(i)}
        aria-label={`Cell ${i + 1} ${squares[i] ? squares[i] : ''}`}
        key={i}
      >
        {squares[i]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = winner === "draw"
      ? (
        <span className="ttt-announcement" data-status="draw">
          It’s a draw!
        </span>
      ) : (
        <span className="ttt-announcement" data-status="winner">
          Winner: <span className="ttt-winner">{winner}</span>
        </span>
      );
  } else {
    status = (
      <span className="ttt-turn">
        Turn: <span className="ttt-player">{currentPlayer}</span>
      </span>
    );
  }

  return (
    <div className="ttt-outer">
      <div className="ttt-container">
        <h1 className="ttt-title" aria-label="Tic Tac Toe">Tic Tac Toe</h1>
        <div className="ttt-status">{status}</div>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe grid">
          {Array(3)
            .fill(0)
            .map((_, row) => (
              <div className="ttt-row" key={row} role="row">
                {Array(3)
                  .fill(0)
                  .map((_, col) => renderSquare(row * 3 + col))}
              </div>
            ))}
        </div>
        <button className="ttt-reset-btn" onClick={handleReset}>
          Reset Game
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          Two-player | Minimal UI &mdash; React&nbsp;TicTacToe
        </span>
      </footer>
    </div>
  );
}

export default App;
