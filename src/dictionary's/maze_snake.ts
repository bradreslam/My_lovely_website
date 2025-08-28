import head_side from "../assets/maze_assets/snake_head.png"
import head_side_dark from "../assets/maze_assets/snake_head_dark.png"
import snake_head_side_door from "../assets/maze_assets/snake_head_door.png"
import snake_head_side_door_dark from "../assets/maze_assets/snake_head_door_dark.png"
import head_front from "../assets/maze_assets/snake_front.png"
import head_front_dark from "../assets/maze_assets/snake_head_front_dark.png"
import tail_side from "../assets/maze_assets/snake_tail.png"
import tail_side_dark from "../assets/maze_assets/snake_tail_dark.png"
import tail_side_door from "../assets/maze_assets/snake_tail_door.png"
import tail_side_door_dark from "../assets/maze_assets/snake_tail_door_dark.png"
import tail_front from "../assets/maze_assets/snake_tail_front.png"
import tail_front_dark from "../assets/maze_assets/snake_tail_front_dark.png"
import turn_left from "../assets/maze_assets/snake_left_turn.png"
import turn_left_dark from "../assets/maze_assets/snake_left_turn_dark.png"
import turn_right from "../assets/maze_assets/snake_right_turn.png"
import turn_right_dark from "../assets/maze_assets/snake_right_turn_dark.png"
import left from "../assets/maze_assets/snake_left.png"
import right from "../assets/maze_assets/snake_right.png"
import right_dark from "../assets/maze_assets/snake_right_dark.png"
import left_dark from "../assets/maze_assets/snake_left_dark.png"
import left_door from "../assets/maze_assets/snake_left_door.png"
import right_door from "../assets/maze_assets/snake_right_door.png"
import right_door_dark from "../assets/maze_assets/snake_right_door_dark.png"
import left_door_dark from "../assets/maze_assets/snake_left_door_dark.png"
import {Lightlevel} from "../enums/lightlevel.ts"


const maze_layout = {
    "left": {
        "head": {
            "side": {
                "door": {[Lightlevel.light]: snake_head_side_door, [Lightlevel.dark]: snake_head_side_door_dark, [Lightlevel.normal]: snake_head_side_door},
                "normal": {[Lightlevel.light]: head_side, [Lightlevel.dark]: head_side_dark, [Lightlevel.normal]: head_side}
            },
            "front": {
                [Lightlevel.light]: head_front, [Lightlevel.dark]: head_front_dark, [Lightlevel.normal]: head_front
            }
        },
        "tail":{
            "side": {
                "door":{[Lightlevel.light]: tail_side_door,[Lightlevel.dark]:tail_side_door_dark,[Lightlevel.normal]:tail_side_door},
                "normal":{[Lightlevel.light]: tail_side,[Lightlevel.dark]:tail_side_dark,[Lightlevel.normal]:tail_side}
            },
            "front": {
                [Lightlevel.light]: tail_front,[Lightlevel.dark]:tail_front_dark,[Lightlevel.normal]:tail_front
            }
        },
        "body": {
            "door": {[Lightlevel.light]: left_door, [Lightlevel.dark]: left_door_dark, [Lightlevel.normal]: left_door},
            "normal": {[Lightlevel.light]: left, [Lightlevel.dark]: left_dark, [Lightlevel.normal]: left},
            "turn": {[Lightlevel.light]: turn_left, [Lightlevel.dark]: turn_left_dark, [Lightlevel.normal]: turn_left}
        }
    },
    "right":{
        "body":{
            "door":{[Lightlevel.light]: right_door,[Lightlevel.dark]:right_door_dark,[Lightlevel.normal]:right_door},
            "normal":{[Lightlevel.light]: right,[Lightlevel.dark]:right_dark,[Lightlevel.normal]:right},
            "turn":{[Lightlevel.light]: turn_right,[Lightlevel.dark]:turn_right_dark,[Lightlevel.normal]:turn_right}
        },
    }
}
export default maze_layout;