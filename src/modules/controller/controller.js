import { toggleBoard, renderGameboard, updateRender } from "../dom/dom.js";
import { Player } from "../player/player.js";

export const player = new Player("player");
export const cpu = new Player("cpu");

function randomCoordinates() {
  let coordinates = [];
  for (let i = 0; i < 2; i++) {
    coordinates.push(Math.floor(Math.random() * 10));
  }
  return coordinates;
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
    computerRound(player);
  } else {
    checkWin(player);
  }
}

function computerRound() {
  setTimeout(() => {
    const [x, y] = getCpuTurn();
    player.gameboard.receiveAttack(x, y);
    updateRender(player);
    if (player.gameboard.cells[x][y].status !== "hit") {
      toggleBoard();
      console.log("missed");
    } else if (checkWin(cpu)) {
      alert("CPU is GOAT");
    } else {
      computerRound();
    }
  }, 1000);
}

export function playGame() {
  player.gameboard.placeShip([
    [0, 0],
    [0, 1],
  ]);
  cpu.gameboard.placeShip([
    [0, 0],
    [0, 1],
  ]);

  renderGameboard(player);
  renderGameboard(cpu);

  computerRound();
}
