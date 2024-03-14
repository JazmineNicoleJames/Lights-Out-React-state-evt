import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for(let i = 0; i < nrows; i++){
      let row = [];
      for(let j = 0; j < ncols; j++){
        const random = Math.random();

        if(random < chanceLightStartsOn){
          row.push(true)
        } else {
          row.push(false);
        };
      };
      initialBoard.push(row); 
    };
    return initialBoard;
  };

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  };


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const boardCopy = JSON.parse(JSON.stringify(oldBoard))

      const { x, y } = coord;
      const neighbors = [
        [y, x],
        [y -1, x],
        [y +1, x],
        [y, x -1],
        [y, x + 1]
    ];
      /* const [y, x] = coord.split("-").map(Number); */

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }

        // flip the cells around it
        neighbors.forEach(([ny, nx]) => {
          if(ny >= 0 && ny < nrows && nx >=0 && nx <ncols){
            boardCopy[ny][nx] = !boardCopy[ny][nx];
          }
        })
      };
      flipCell(y, x, boardCopy);

      return boardCopy;
    });
  }

  // If user has won, display winning message and nothing else
  if(hasWon()){
    return <div>You won!</div> 
  }

  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (     
          <tr key={y}> 
            {row.map((isLit, x) => (
              <Cell key={`${y}-${x}`} flipCellsAroundMe={() => flipCellsAround({y, x})} isLit={isLit} />
            ))}
          </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Board;
