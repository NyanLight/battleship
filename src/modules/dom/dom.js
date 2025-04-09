export function renderGameboard(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.name !== "Computer" ? fieldNodes[0] : fieldNodes[1];
  const gameboard = player.gameboard;
  for (let i = 0; i < gameboard.cells.length; i++) {
    for (let j = 0; j < gameboard.cells[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.toggle("cell");
      if (
        gameboard.misses.find(
          (coord) => JSON.stringify(coord) === JSON.stringify([i, j])
        ) !== undefined
      ) {
        cell.classList.toggle("miss");
      }
      field.appendChild(cell);
    }
  }
}
