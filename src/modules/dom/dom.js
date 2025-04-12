export function updateRender(player) {
  const fieldNodes = document.getElementsByClassName("gameboard");
  const field = player.name !== "Computer" ? fieldNodes[0] : fieldNodes[1];
  field.innerHTML = ''; 
  renderGameboard(player);
}

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
        cell.textContent = 'x';
      } else if (gameboard.cells[i][j].status === 'hit') {
        cell.classList.toggle('hit');
        cell.textContent = 'X'
      } else if (gameboard.cells[i][j].status === 'ship') {
        cell.classList.toggle('ship');
      }
      if (gameboard.cells[i][j].status === 'ship' || gameboard.cells[i][j].status === 'empty')   cell.addEventListener('click', () => attackCell(i, j, player));
      field.appendChild(cell);
    }
  }
}

export function attackCell(x, y, target) {
  target.gameboard.receiveAttack(x, y);
  updateRender(target);
}