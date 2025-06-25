import {Direction} from "../enums/direction.ts"

export class torch {
    lit:boolean;
    orientation:Direction;

    constructor(lit:boolean, orientation:Direction) {
        this.lit = lit;
        this.orientation = orientation;
    }
}