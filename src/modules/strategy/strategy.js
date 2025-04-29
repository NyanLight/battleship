import { getCpuTurn, player } from "../controller/controller";

export class Strategy {
  constructor() {
    this.lastHit = null;
  }

  log(turn) {
    this.lastHit = turn;
  }

  clearLog() {
    this.turns = null;
  }

  chooseAttack() {
    if (!this.lastHit) {
      const [x, y] = getCpuTurn();
      return [x, y];
    } else {
      const [x, y] = this.lastHit;
      if (player.gameboard.canReceiveAttackAt(x, y - 1)) {
        return [x, y - 1];
      } else if (player.gameboard.canReceiveAttackAt(x - 1, y)) {
        return [x - 1, y];
      } else if (player.gameboard.canReceiveAttackAt(x, y + 1)) {
        return [x, y + 1];
      } else if (player.gameboard.canReceiveAttackAt(x + 1, y)) {
        return [x + 1, y];
      } else {
        return getCpuTurn();
      }
    }
  }
}
