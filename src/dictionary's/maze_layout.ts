import {room} from "../classes/maze_room.ts"
import {wall_types} from "../enums/wall_types.ts"
import {torch_state} from "../enums/torch_state.ts"
import {Interactable_types} from "../enums/interactable_types.ts"
import {Interactable} from "../classes/interactable.ts"
import {Direction} from "../enums/direction.ts"
import {torch} from "../classes/torch.ts"

const maze_layout:{[key:number]:room} = {
    1: new room(wall_types.hall,wall_types.wall,wall_types.wall,wall_types.wall,false,new Interactable(Direction.N,Interactable_types.entrance), null, 1),
    2: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.wall,true,null,null, 2),
    3: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.gate,true,new Interactable(Direction.S,Interactable_types.chest2), null, 3),
    4: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.gate,true,null,new torch(torch_state.off, Direction.S), 4),
    5: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.gate,true,null,new torch(torch_state.on, Direction.S), 5),
    6: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.gate,true,new Interactable(Direction.E, Interactable_types.chest3),null, 6),
    7: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.wall,false,new Interactable(Direction.N, Interactable_types.right_tower),null, 7),
    8: new room(wall_types.wall,wall_types.gate,wall_types.hall,wall_types.wall,true,null,null, 8),
    9: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,true,null,new torch(torch_state.on, Direction.N), 9),
    10: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.gate,true,null,null, 10),
    11: new room(wall_types.wall,wall_types.wall,wall_types.gate,wall_types.wall,true,null,null, 11),
    12: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.wall,true,null,null, 12),
    13: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.gate,true,null,null, 13),
    14: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.wall,true,null,null, 14),
    15: new room(wall_types.gate,wall_types.wall,wall_types.wall,wall_types.wall,true,new Interactable(Direction.S,Interactable_types.chest4),null, 15),
    16: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.wall,true,null,null, 16),
    17: new room(wall_types.hall,wall_types.hall,wall_types.gate,wall_types.gate,false,null,null, 17),
    18: new room(wall_types.wall,wall_types.hall,wall_types.wall,wall_types.hall,false,null,new torch(torch_state.on,Direction.N), 18),
    19: new room(wall_types.hall,wall_types.gate,wall_types.wall,wall_types.hall,false,null,null, 19),
    20: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.gate,true,null,null, 20),
    21: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.wall,true,null,new torch(torch_state.off, Direction.E), 21),
    22: new room(wall_types.wall,wall_types.door2,wall_types.gate,wall_types.wall,true,null,null, 22),
    23: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.door2,true,null,new torch(torch_state.on, Direction.E), 23),
    24: new room(wall_types.hall,wall_types.door3,wall_types.hall,wall_types.wall,false,null,null, 24),
    25: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.door3,true,null,null, 25),
    26: new room(wall_types.hall,wall_types.wall,wall_types.hall,wall_types.wall,false,null,new torch(torch_state.on, Direction.W), 26),
    27: new room(wall_types.gate,wall_types.gate,wall_types.gate,wall_types.wall,true,null,null, 27),
    28: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.gate,true,null,new torch(torch_state.on, Direction.E), 28),
    29: new room(wall_types.gate,wall_types.gate,wall_types.wall,wall_types.wall,true,null,new torch(torch_state.on, Direction.W), 29),
    30: new room(wall_types.wall,wall_types.hall,wall_types.gate,wall_types.gate,false,null,null, 30),
    31: new room(wall_types.gate,wall_types.hall,wall_types.hall,wall_types.hall,false,new Interactable(Direction.N,Interactable_types.nest),null, 31),
    32: new room(wall_types.wall,wall_types.hall,wall_types.wall,wall_types.hall,false,null,new torch(torch_state.on, Direction.S), 32),
    33: new room(wall_types.gate,wall_types.wall,wall_types.hall,wall_types.hall,false,null,null, 33),
    34: new room(wall_types.gate,wall_types.wall,wall_types.gate,wall_types.wall,true,null,null, 34),
    35: new room(wall_types.wall,wall_types.wall,wall_types.gate,wall_types.wall,true,null,null, 35),
    36: new room(wall_types.wall,wall_types.wall,wall_types.gate,wall_types.wall,true,new Interactable(Direction.N,Interactable_types.chest1),null, 36),
    37: new room(wall_types.door1,wall_types.gate,wall_types.wall,wall_types.wall,true,null,new torch(torch_state.on, Direction.W), 37),
    38: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,true,null,null, 38),
    39: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.gate,true,null,null, 39),
    40: new room(wall_types.gate,wall_types.gate,wall_types.gate,wall_types.gate,true,null,null, 40),
    41: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,true,null,new torch(torch_state.on, Direction.N), 41),
    42: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.gate,true,null,null, 42),
    43: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.wall,false,new Interactable(Direction.W,Interactable_types.left_tower),null, 43),
    44: new room(wall_types.wall,wall_types.wall,wall_types.door1,wall_types.gate,true,null,null, 44),
    45: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.wall,true,null,null, 45),
    46: new room(wall_types.wall,wall_types.gate,wall_types.wall,wall_types.gate,true,null,null, 46),
    47: new room(wall_types.wall,wall_types.gate,wall_types.gate,wall_types.gate,true,null,new torch(torch_state.on,Direction.N), 47),
    48: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.gate,true,null,null, 48),
    49: new room(wall_types.wall,wall_types.wall,wall_types.wall,wall_types.wall,true,null,null, 49)
}
export default maze_layout