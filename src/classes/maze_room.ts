import {torch} from "./torch.ts"
import {Interactable} from "./interactable.ts"
import {wall_types} from "../enums/wall_types.ts"
import {Direction} from "../enums/direction.ts"

export class room {
    public N_wall: wall_types;
    public E_wall: wall_types;
    public S_wall: wall_types;
    public W_Wall: wall_types;
    public Ceiling: boolean;
    public Interactable: Interactable | null;
    public torch: torch | null;
    public index_number: number;

    constructor(
        N_wall: wall_types,
        E_wall: wall_types,
        S_wall: wall_types,
        W_Wall: wall_types,
        Ceiling: boolean,
        Interactable: Interactable | null = null,
        torch: torch | null = null,
        index_number:number
    ) {
        this.N_wall = N_wall;
        this.E_wall = E_wall;
        this.S_wall = S_wall;
        this.W_Wall = W_Wall;
        this.Ceiling = Ceiling;
        this.Interactable = Interactable;
        this.torch = torch;
        this.index_number = index_number
    }

    public getWall(direction: Direction): wall_types {
        switch (direction) {
            case Direction.N: return this.N_wall;
            case Direction.E: return this.E_wall;
            case Direction.S: return this.S_wall;
            case Direction.W: return this.W_Wall;
        }
    }
}