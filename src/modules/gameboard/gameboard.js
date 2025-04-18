import { Ship } from "../ship/ship.js";
import { Cell } from "../cell/cell.js";

export class Gameboard {
  constructor() {
    this.cells = this.createBoard();
    this.heads = [];
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        let cell = new Cell();
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }

  canPlaceAt(array) {
    for (let i = 0; i < array.length; i++) {
      const x = array[i][0];
      const y = array[i][1];
      if (x > 9 || y > 9 || x < 0 || y < 0) return false; 
      if (this.cells[x][y].status === 'ship') return false; 
    }
    return true;
  }
  
  placeShip(array) {
    this.heads.push(array[0]);
    const ship = new Ship(array.length);
    array.forEach((coordinates) => {
      const x = coordinates[0];
      const y = coordinates[1];
      this.cells[x][y].ship = ship;
      this.cells[x][y].status = 'ship';
    });
  }

  clearGameboard() {
    this.cells = this.createBoard();
  }

  receiveAttack(x, y) {
    if (this.cells[x][y].status === 'empty') {
      this.cells[x][y].status = 'missed';
      return 'missed';
    } else {
      this.cells[x][y].ship.hit();
      this.cells[x][y].status = 'hit';
      return 'hit';
    }
  }

  allSunk() {
    for (let i = 0; i < this.heads.length; i++) {
      const x = this.heads[i][0];
      const y = this.heads[i][1];
      if (!this.cells[x][y].ship.isSunk()) return false;
    }
    return true;
  }
}
