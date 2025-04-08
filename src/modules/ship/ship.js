export class Ship {
  constructor(length) {
    this.length = length;
  }

  hits = 0;
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits === this.length;
  }
}
