import {Direction} from "../enums/direction.ts"
import {Interactable_types} from "../enums/interactable_types.ts"
import {item} from "../enums/items.ts"

export class Interactable {
    orientation:Direction;
    interactable:Interactable_types;
    item:item | null;

    constructor(orientation:Direction, interactable:Interactable_types, item:item | null = null) {
        this.orientation = orientation;
        this.interactable = interactable;
        this.item = item;
    }
}