import { Ship } from "../../ship/ship";

export class Gameboard {
  constructor() {
    this.board = this.createBoard();
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
      this.board[x][y] = ship;
    });
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === null) {
      this.misses.push([x, y]);
    } else {
      this.board[x][y].hit();
    }
  }

  allSunk() {
    for (let i = 0; i < this.heads.length; i++) {
      const x = this.heads[i][0];
      const y = this.heads[i][1];
      if (!this.board[x][y].isSunk()) return false;
    }
    return true;
  }
}
