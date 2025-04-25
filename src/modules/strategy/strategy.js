export class Strategy {
    constructor () {
        this.turns = [];
    }

    log (turn) {
        if (this.turns.length > 5) this.turns.pop();
        this.turns.push(turn);
    }
}