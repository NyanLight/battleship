export function randomCoordinates() {
  let coordinates = [];
  for (let i = 0; i < 2; i++) {
    coordinates.push(Math.floor(Math.random() * 10));
  }
  return coordinates;
}