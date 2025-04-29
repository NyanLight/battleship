import { Gameboard } from "../gameboard/gameboard.js";
import { Strategy } from "../strategy/strategy.js";

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    this.ai = this.type === "cpu" ? new Strategy() : null;
  }
}
