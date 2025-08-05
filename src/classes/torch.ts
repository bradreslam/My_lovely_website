import {Direction} from "../enums/direction.ts"
import {torch_state} from "../enums/torch_state.ts"

export class torch {
    lit:torch_state;
    orientation:Direction;

    constructor(lit:torch_state, orientation:Direction) {
        this.lit = lit;
        this.orientation = orientation;
    }
}