import {room} from "../classes/maze_room.ts"
import {wall_types} from "../enums/wall_types.ts"
import {Interactable_types} from "../enums/interactable_types.ts"
import {Interactable} from "../classes/interactable.ts"
import {Direction} from "../enums/direction.ts"
import {torch} from "../classes/torch.ts"

const maze_layout:{[key:number]:room} = {
    1: new room(wall_types.hall, wall_types.wall, wall_types.wall, wall_types.wall, new Interactable(Direction.N,Interactable_types.entrance), null),
    2: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.wall,null,null),
    3: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.gate,new Interactable(Direction.S,Interactable_types.chest2), null),
    4: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.gate,null,new torch(false, Direction.S)),
    5: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.gate,null,new torch(true, Direction.S)),
    6: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.gate,new Interactable(Direction.E, Interactable_types.chest3),null),
    7: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.wall,new Interactable(Direction.N, Interactable_types.right_tower),null),
    8: new room(wall_types.wall,wall_types.gate,wall_types.hall,wall_types.wall,null,null),
    9: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,null,new torch(true, Direction.N)),
    10: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.gate,null,null),
    11: new room(wall_types.wall,wall_types.wall,wall_types.gate,wall_types.wall,null,null),
    12: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.wall,null,null),
    13: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.gate,null,null),
    14: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.wall,null,null),
    15: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.wall,new Interactable(Direction.S,Interactable_types.chest4),null),
    16: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.wall,null,null),
    17: new room(wall_types.hall,wall_types.hall,wall_types.gate,wall_types.gate,null,null),
    18: new room(wall_types.wall,wall_types.hall,wall_types.wall,wall_types.hall,null,new torch(true,Direction.N)),
    19: new room(wall_types.hall,wall_types.gate,wall_types.wall,wall_types.hall,null,null),
    20: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.gate,null,null),
    21: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.wall,null,new torch(false, Direction.E)),
    22: new room(wall_types.wall,wall_types.door2,wall_types.gate,wall_types.wall,null,null),
    23: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.door2,null,new torch(true, Direction.E)),
    24: new room(wall_types.hall,wall_types.door3,wall_types.hall,wall_types.wall,null,null),
    25: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.door3,null,null),
    26: new room(wall_types.hall,wall_types.wall,wall_types.hall,wall_types.wall,null,new torch(true, Direction.W)),
    27: new room(wall_types.gate,wall_types.gate,wall_types.gate,wall_types.wall,null,null),
    28: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.gate,null,new torch(true, Direction.E)),
    29: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.wall,null,new torch(true, Direction.W)),
    30: new room(wall_types.wall,wall_types.hall,wall_types.gate,wall_types.gate,null,null),
    31: new room(wall_types.gate,wall_types.hall,wall_types.hall,wall_types.hall,new Interactable(Direction.N,Interactable_types.nest),null),
    32: new room(wall_types.wall,wall_types.hall,wall_types.wall,wall_types.hall,null,new torch(true, Direction.S)),
    33: new room(wall_types.gate,wall_types.wall,wall_types.hall,wall_types.hall,null,null),
    34: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.wall,null,null),
    35: new room(wall_types.wall,wall_types.wall,wall_types.gate,wall_types.wall,null,null),
    36: new room(wall_types.wall,wall_types.wall,wall_types.gate,wall_types.wall,new Interactable(Direction.N,Interactable_types.chest1),null),
    37: new room(wall_types.door1,wall_types.gate,wall_types.wall,wall_types.wall,null,new torch(true, Direction.W)),
    38: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,null,null),
    39: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.gate,null,null),
    40: new room(wall_types.gate,wall_types.gate,wall_types.gate,wall_types.gate,null,null),
    41: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,null,new torch(true, Direction.N)),
    42: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.gate,null,null),
    43: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.wall,new Interactable(Direction.W,Interactable_types.left_tower),null),
    44: new room(wall_types.wall,wall_types.wall,wall_types.door1,wall_types.gate,null,null),
    45: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.wall,null,null),
    46: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.gate,null,null),
    47: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,null,new torch(true,Direction.N)),
    48: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.gate,null,null),
    49: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.wall,null,null)
}
export default maze_layout