import { Gameboard } from "../gameboard/gameboard.js";

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }
}
