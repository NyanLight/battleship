import { restartGame, playerRound } from "../controller/controller";

let dragLength;

const draggables = document.querySelectorAll(".draggable");
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartGame);

export function updateRender(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.type !== "cpu" ? fieldNodes[0] : fieldNodes[1];
  field.innerHTML = "";
  renderGameboard(player);
}

export function updateStatus(message) {
  const status = document.getElementById("status");
  status.textContent = message;
}

export function toggleBoard(target) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  fieldNodes[0].classList.toggle("disabled");
  fieldNodes[1].classList.toggle("disabled");
}

export function toggleRestart() {
  const restartBtn = document.getElementById("restart");
  restartBtn.classList.toggle("hidden");
  restartBtn.classList.toggle("visible");
}

export function resetStyles() {
  const fieldNodes = document.getElementsByClassName("gameboard");
  fieldNodes[0].classList.remove("disabled");
  fieldNodes[1].classList.add("disabled");
}

export function blockBoards() {
  const fieldNodes = document.getElementsByClassName("gameboard");
  fieldNodes[0].classList.add("disabled");
  fieldNodes[1].classList.add("disabled");
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
      if (player.type === "player") cell.classList.add("dropable");
      if (gameboard.cells[i][j].status === "missed") {
        cell.classList.toggle("miss");
        cell.textContent = "x";
      } else if (gameboard.cells[i][j].status === "hit") {
        cell.classList.toggle("hit");
        cell.textContent = "X";
      } else if (gameboard.cells[i][j].status === "ship") {
        cell.classList.toggle("ship");
      }
      if (
        player.type === "cpu" &&
        (player.gameboard.cells[i][j].status === "ship" ||
          player.gameboard.cells[i][j].status === "empty")
      )
        cell.addEventListener("click", () => playerRound(i, j));
      cell.dataset.xy = `${i},${j}`;
      if (player.type !== "cpu") {
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          if (calculatePlace(i, j, player)) {
            cell.classList.add("dragover");
            handleDragOver(i, j, player);
          }
        });

        cell.addEventListener("dragleave", (e) => {
          const dragovers = document.querySelectorAll(".dragover");
          dragovers.forEach((target) => {
            target.classList.remove("dragover");
          });
        });

        cell.addEventListener("drop", (e) => handleDrop(e, i, j, player));
      }

      field.appendChild(cell);
    }
  }
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (ev) => {
    draggable.classList.add("dragging");
    dragLength = draggable.children.length;
  });

  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
  });
});

const gameboards = document.getElementsByClassName("gameboard");
gameboards[0].addEventListener("dragover", (e) => {
  e.preventDefault();
});

function calculatePlace(x, y, player) {
  let potentialPlaces = [];
  for (let i = 0; i < dragLength; i++) {
    potentialPlaces.push([x, y + i]);
  }
  return player.gameboard.canPlaceAt(potentialPlaces);
}

function handleDragOver(x, y, player) {
  if (calculatePlace(x, y, player)) {
    let potentialPlaces = [];
    for (let i = 0; i < dragLength; i++) {
      potentialPlaces.push([x, y + i]);
    }
    potentialPlaces.forEach((coord) => {
      const x = coord[0];
      const y = coord[1];
      const targetNode = document.querySelector(`[data-xy="${x},${y}"]`);
      targetNode.classList.add("dragover");
    });
  }
}

function handleDrop(e, x, y, player) {
  e.preventDefault();
  if (calculatePlace(x, y, player)) {
    let potentialPlaces = [];
    for (let i = 0; i < dragLength; i++) {
      potentialPlaces.push([x, y + i]);
    }
    player.gameboard.placeShip(potentialPlaces);
    updateRender(player);
  }
}
