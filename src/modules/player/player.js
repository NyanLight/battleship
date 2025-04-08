import {Gameboard} from '../gameboard/gameboard.js'

export class Player {
    constructor (name = 'Computer') {
        this.name = name;
        this.board = new Gameboard();
    }
}