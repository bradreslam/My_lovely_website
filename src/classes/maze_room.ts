import {torch} from "./torch.ts"
import {Interactable} from "./interactable.ts"
import {wall_types} from "../enums/wall_types.ts"
import {Direction} from "../enums/direction.ts"

export class room {
    public N_wall: wall_types | null;
    public E_wall: wall_types | null;
    public S_wall: wall_types | null;
    public W_Wall: wall_types | null;
    public Interactable: Interactable | null;
    public torch: torch | null;

    constructor(
        N_wall: wall_types | null = null,
        E_wall: wall_types | null = null,
        S_wall: wall_types | null = null,
        W_Wall: wall_types | null = null,
        Interactable: Interactable | null = null,
        torch: torch | null = null
    ) {
        this.N_wall = N_wall;
        this.E_wall = E_wall;
        this.S_wall = S_wall;
        this.W_Wall = W_Wall;
        this.Interactable = Interactable;
        this.torch = torch;
    }

    public getWall(direction: Direction): wall_types | null {
        switch (direction) {
            case Direction.N: return this.N_wall;
            case Direction.E: return this.E_wall;
            case Direction.S: return this.S_wall;
            case Direction.W: return this.W_Wall;
            default: return null;
        }
}