export function renderGameboard(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.name !== "Computer" ? fieldNodes[0] : fieldNodes[1];
  const gameboard = player.gameboard;
  for (let i = 0; i < gameboard.cells.length; i++) {
    for (let j = 0; j < gameboard.cells[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.toggle("cell");
      if (gameboard.cells[i][j].status === 'missed') {
        cell.classList.toggle("miss");
      } else if (gameboard.cells[i][j].status === 'hit') {
        cell.classList.toggle('hit');
      } else if (gameboard.cells[i][j].status === 'ship') {
        cell.classList.toggle('ship');
      }
      field.appendChild(cell);
    }
  }
}
