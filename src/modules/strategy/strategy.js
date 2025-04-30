import { getCpuTurn, player } from "../controller/controller";

export class Strategy {
  constructor() {
    this.queque = [];
  }

  log(turn) {
    const [x, y] = turn;
    if (player.gameboard.canReceiveAttackAt(x, y - 1))
      this.queque.push([x, y - 1]);
    if (player.gameboard.canReceiveAttackAt(x - 1, y))
      this.queque.push([x - 1, y]);
    if (player.gameboard.canReceiveAttackAt(x, y + 1))
      this.queque.push([x, y + 1]);
    if (player.gameboard.canReceiveAttackAt(x + 1, y))
      this.queque.push([x + 1, y]);
  }

  clearLog() {
    this.queque = [];
  }

  chooseAttack() {
    if (this.queque.length === 0) {
      const [x, y] = getCpuTurn();
      return [x, y];
    } else {
      const turn = this.queque[0];
      this.queque.shift();
      return turn;
    }
  }
}
