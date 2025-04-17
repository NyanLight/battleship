import { player, playerRound } from "../controller/controller";

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


export function renderGameboard(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.type !== "cpu" ? fieldNodes[0] : fieldNodes[1];
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
