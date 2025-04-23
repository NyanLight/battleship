import {
  toggleBoard,
  renderGameboard,
  updateRender,
  updateStatus,
  resetStyles,
  toggleRestart,
  blockBoards,
} from "../dom/dom.js";
import { Player } from "../player/player.js";
import { randomCoordinates } from "../utils/utils.js";

export const player = new Player("player");
export const cpu = new Player("cpu");

export function restartGame() {
  player.gameboard.clearGameboard();
  cpu.gameboard.clearGameboard();
  resetStyles();
  toggleRestart();
  playGame();
}

function getCpuTurn() {
  let [x, y] = randomCoordinates();
  while (
    player.gameboard.cells[x][y].status !== "ship" &&
    player.gameboard.cells[x][y].status !== "empty"
  ) {
    [x, y] = randomCoordinates();
  }
  return [x, y];
}

function checkWin(pretender) {
  const target = pretender === player ? cpu : player;
  return target.gameboard.allSunk();
}

export function playerRound(x, y) {
  cpu.gameboard.receiveAttack(x, y);
  updateRender(cpu);
  if (cpu.gameboard.cells[x][y].status !== "hit") {
    toggleBoard();
    updateStatus("Miss! CPU attacks!");
    computerRound(player);
  } else if (checkWin(player)) {
    updateStatus("Player is a winner!");
    blockBoards();
    toggleRestart();
  } else {
    updateStatus("Hit! Player strikes again!");
  }
}

export function computerRound() {
  setTimeout(() => {
    const [x, y] = getCpuTurn();
    player.gameboard.receiveAttack(x, y);
    updateRender(player);
    if (player.gameboard.cells[x][y].status !== "hit") {
      updateStatus("Miss! Player, attack!");
      toggleBoard();
    } else if (checkWin(cpu)) {
      updateStatus("Cpu is a winner!");
      blockBoards();
      toggleRestart();
    } else {
      updateStatus("Hit! CPU strike again!");
      computerRound();
    }
  }, 1000);
}

function randomPlace(length) {
  let array = [[10, 10]];
  do {
    let head = randomCoordinates();
    let direction = Math.floor(Math.random) < 0.5 ? "v" : "h";
    while (cpu.gameboard.cells[head[0]][head[1]].status !== "empty") {
      head = randomCoordinates();
    }
    array = [head];
    if (length === 1) return [head];
    for (let i = 1; i < length; i++) {
      if (direction === "h") {
        array.push([head[0] + i, head[1]]);
      } else {
        array.push([head[0], head[1] + i]);
      }
    }
  } while (!cpu.gameboard.canPlaceAt(array));
  return array;
}

export function playGame() {
  cpu.gameboard.placeShip(randomPlace(1));
  cpu.gameboard.placeShip(randomPlace(1));
  cpu.gameboard.placeShip(randomPlace(1));
  cpu.gameboard.placeShip(randomPlace(1));
  cpu.gameboard.placeShip(randomPlace(2));
  cpu.gameboard.placeShip(randomPlace(2));
  cpu.gameboard.placeShip(randomPlace(2));
  cpu.gameboard.placeShip(randomPlace(4));
  cpu.gameboard.placeShip(randomPlace(4));
  cpu.gameboard.placeShip(randomPlace(6));
  renderGameboard(player);
  renderGameboard(cpu);
}
