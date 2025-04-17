import { restartGame, playerRound } from "../controller/controller";

const restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', restartGame);

export function updateRender(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.type !== "cpu" ? fieldNodes[0] : fieldNodes[1];
  field.innerHTML = "";
  renderGameboard(player);
}

export function updateStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
 }

export function toggleBoard(target) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  fieldNodes[0].classList.toggle('disabled');
  fieldNodes[1].classList.toggle('disabled');
}

export function toggleRestart() {
  const restartBtn = document.getElementById('restart');
  restartBtn.classList.toggle('hidden');
  restartBtn.classList.toggle('visible');
}

export function resetStyles() {
  const fieldNodes = document.getElementsByClassName("gameboard");
  fieldNodes[0].classList.remove('disabled');
  fieldNodes[1].classList.add('disabled');
}

export function blockBoards() {
  const fieldNodes = document.getElementsByClassName("gameboard");
  fieldNodes[0].classList.add('disabled');
  fieldNodes[1].classList.add('disabled');
}


export function renderGameboard(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.type !== "cpu" ? fieldNodes[0] : fieldNodes[1];
  field.innerHTML = null;
  const gameboard = player.gameboard;
  for (let i = 0; i < gameboard.cells.length; i++) {
    for (let j = 0; j < gameboard.cells[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.toggle("cell");
      if (gameboard.cells[i][j].status === "missed") {
        cell.classList.toggle("miss");
        cell.textContent = "x";
      } else if (gameboard.cells[i][j].status === "hit") {
        cell.classList.toggle("hit");
        cell.textContent = "X";
      } else if (gameboard.cells[i][j].status === "ship") {
        cell.classList.toggle("ship");
      }
      if (player.type === "cpu" && (player.gameboard.cells[i][j].status === 'ship' || player.gameboard.cells[i][j].status === 'empty')) cell.addEventListener("click", () => playerRound(i, j));
      field.appendChild(cell);
    }
  }
}
