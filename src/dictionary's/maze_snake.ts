import empty from "../assets/maze_assets/empty.png"
import head_side from "../assets/maze_assets/snake_head.png"
import snake_head_side_door from "../assets/maze_assets/snake_head_door.png"
import head_front from "../assets/maze_assets/snake_front.png"
import tail_side from "../assets/maze_assets/snake_tail.png"
import tail_front from "../assets/maze_assets/snake_tail_front.png"
import turn_left from "../assets/maze_assets/snake_left_turn.png"
import turn_right from "../assets/maze_assets/snake_right_turn.png"
import left from "../assets/maze_assets/snake_left.png"
import right from "../assets/maze_assets/snake_right.png"
import left_dark from "../assets/maze_assets/snake_left_dark.png"
import left_door from "../assets/maze_assets/snake_left_door.png"
import right_door from "../assets/maze_assets/snake_right_door.png"
import left_door_dark from "../assets/maze_assets/snake_left_door_dark.png"
import {Lightlevel} from "../enums/lightlevel.ts"


const maze_layout = {
    "left": {
        "head": {
            "side": {
                "door": {[Lightlevel.light]: empty, [Lightlevel.dark]: empty, [Lightlevel.normal]: snake_head_side_door},
                "normal": {[Lightlevel.light]: empty, [Lightlevel.dark]: empty, [Lightlevel.normal]: head_side}
            },
            "front": {
                [Lightlevel.light]: empty, [Lightlevel.dark]: empty, [Lightlevel.normal]: head_front
            }
        },
        "tail":{
            "side": {
                "door":{[Lightlevel.light]: empty,[Lightlevel.dark]:empty,[Lightlevel.normal]:empty},
                "normal":{[Lightlevel.light]: empty,[Lightlevel.dark]:empty,[Lightlevel.normal]:tail_side}
            },
            "front": {
                [Lightlevel.light]: empty,[Lightlevel.dark]:empty,[Lightlevel.normal]:tail_front
            }
        },
        "body": {
            "door": {[Lightlevel.light]: empty, [Lightlevel.dark]: left_door_dark, [Lightlevel.normal]: left_door},
            "normal": {[Lightlevel.light]: empty, [Lightlevel.dark]: left_dark, [Lightlevel.normal]: left},
            "turn": {[Lightlevel.light]: empty, [Lightlevel.dark]: empty, [Lightlevel.normal]: turn_left}
        }
    },
    "right":{
        "body":{
            "door":{[Lightlevel.light]: empty,[Lightlevel.dark]:empty,[Lightlevel.normal]:right_door},
            "normal":{[Lightlevel.light]: empty,[Lightlevel.dark]:empty,[Lightlevel.normal]:right},
            "turn":{[Lightlevel.light]: empty,[Lightlevel.dark]:empty,[Lightlevel.normal]:turn_right}
        },
    }
}
export default maze_layout;