import {
  restartGame,
  playerRound,
  computerRound,
} from "../controller/controller";

let dragLength;
let rotated = false;
let drops = [4, 3, 2, 1];

const draggables = document.querySelectorAll(".draggable");
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
  drops = [4, 3, 2, 1];
  restartGame();
});

export function updateRender(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.type !== "cpu" ? fieldNodes[0] : fieldNodes[1];
  field.innerHTML = "";
  checkDrops();
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

function isDeployOver() {
  console.log("enter the function");
  for (const drop of drops) {
    console.log(drops);
    if (drop !== 0) return false;
  }
  return true;
}

function handleDeployEnd() {
  if (isDeployOver()) computerRound();
}

function checkDrops() {
  const dropElements = document.querySelectorAll(".drop");
  for (let i = 0; i < dropElements.length; i++) {
    if (drops[i] === 0) {
      dropElements[i].classList.add("hidden");
    } else {
      dropElements[i].classList.remove("hidden");
    }
  }
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

function calculatePlace(x, y, player) {
  let potentialPlaces = fillPotentialPlaces(x, y);
  return player.gameboard.canPlaceAt(potentialPlaces);
}

function handleDragOver(x, y, player) {
  if (calculatePlace(x, y, player)) {
    let potentialPlaces = fillPotentialPlaces(x, y);
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
    let potentialPlaces = fillPotentialPlaces(x, y);
    player.gameboard.placeShip(potentialPlaces);
    if (dragLength !== 6) {
      drops[dragLength - 1] -= 1;
    } else {
      drops[3] -= 1;
    }
    handleDeployEnd();
    updateRender(player);
  }
}

function fillPotentialPlaces(x, y) {
  let potentialPlaces = [];
  for (let i = 0; i < dragLength; i++) {
    if (!rotated) {
      potentialPlaces.push([x, y + i]);
    } else {
      potentialPlaces.push([x + i, y]);
    }
  }
  return potentialPlaces;
}

const rotateBtn = document.getElementById("rotateBtn");
rotateBtn.addEventListener("click", () => handleRotate());
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === "r") handleRotate();
});

function handleRotate() {
  const ships = document.getElementsByClassName("drop");
  const shipsArray = Array.from(ships);
  shipsArray.forEach((ship) => {
    ship.classList.toggle("rotated");
  });
  rotated = !rotated;
}
