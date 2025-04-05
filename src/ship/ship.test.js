import {Ship} from './ship.js';

it("Ship with length of 3 should sink after 3 hits", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunc()).toBe(true);
});

it("Ship with length of 3 shouldn't sink after 2 hits", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunc()).toBe(false);
})