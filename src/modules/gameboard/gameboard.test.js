import { Gameboard } from "./gameboard.js";

describe("allSunk method", () => {
  const gb = new Gameboard();
  gb.placeShip([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  gb.placeShip([[2, 1]]);
  gb.receiveAttack(0, 0);
  gb.receiveAttack(0, 1);
  gb.receiveAttack(0, 2);
  it("Return false if there are still ships that aren't sunk", () => {
    expect(gb.allSunk()).toBe(false);
  });
  it("Return true if all of the ships are sunk", () => {
    gb.receiveAttack(2, 1);
    expect(gb.allSunk()).toBe(true);
  });
});

describe("receiveAttack misses", () => {
  const gb = new Gameboard();
  gb.placeShip([[2, 3]]);
  gb.placeShip([
    [3, 3],
    [3, 4],
  ]);
  gb.receiveAttack(0, 1);
  it("if enemy missed, gameboard records this", () => {
    expect(gb.cells[0][1].status).toBe("missed");
  });
  gb.receiveAttack(2, 3);
  it("if enemy hit the ship, gameboard doesn't record this to misses", () => {
    expect(gb.cells[2][3].status).toBe("hit");
  });
});

it("Heads actually works and store head of ships", () => {
  const gb = new Gameboard();
  gb.placeShip([
    [2, 3],
    [2, 4],
    [2, 5],
  ]);
  gb.placeShip([
    [1, 2],
    [1, 3],
  ]);
  expect(gb.heads.length).toBe(2);
  gb.placeShip([[0, 0]]);
  expect(gb.heads.length).toBe(3);
});
