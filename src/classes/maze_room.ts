import {torch} from "./torch.ts"
import {Interactable} from "./interactable.ts"
import {wall_types} from "../enums/wall_types.ts"

export class room {
    N_wall: wall_types | null;
    E_wall: wall_types | null;
    S_wall: wall_types | null;
    W_Wall: wall_types | null;
    Interactable: Interactable | null;
    torch: torch | null;

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
}