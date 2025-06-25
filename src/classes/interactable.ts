import {Direction} from "../enums/direction.ts"
import {Interactable_types} from "../enums/interactable_types.ts"

export class Interactable {
    orientation:Direction;
    interacteble:Interactable_types

    constructor(orientation:Direction, interactable:Interactable_types) {
        this.orientation = orientation;
        this.interacteble = interactable;
    }
}