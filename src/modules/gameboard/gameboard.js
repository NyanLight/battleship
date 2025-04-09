import { Ship } from "../ship/ship.js";

export class Gameboard {
  constructor() {
    this.cells = this.createBoard();
    this.misses = [];
    this.heads = [];
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        let cell = null;
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }

  placeShip(array) {
    this.heads.push(array[0]);
    const ship = new Ship(array.length);
    array.forEach((coordinates) => {
      const x = coordinates[0];
      const y = coordinates[1];
      this.cells[x][y] = ship;
    });
  }

  receiveAttack(x, y) {
    if (this.cells[x][y] === null) {
      this.misses.push([x, y]);
    } else {
      this.cells[x][y].hit();
    }
  }

  allSunk() {
    for (let i = 0; i < this.heads.length; i++) {
      const x = this.heads[i][0];
      const y = this.heads[i][1];
      if (!this.cells[x][y].isSunk()) return false;
    }
    return true;
  }
}
