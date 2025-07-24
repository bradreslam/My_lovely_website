import side_wall_light from "../assets/maze_assets/side_wall_light.png"
import back_wall_dark from "../assets/maze_assets/back_wall_dark.png"
import back_wall from "../assets/maze_assets/back_wall.png"
import back_wall_light from "../assets/maze_assets/back_wall_light.png"
import side_wall_dark from "../assets/maze_assets/side_wall_dark.png"
import side_wall from "../assets/maze_assets/side_wall.png"
import gate from "../assets/maze_assets/gate.png"
import gate_dark from "../assets/maze_assets/gate_dark.png"
import gate_light from "../assets/maze_assets/gate_light.png"
import {wall_types} from "../enums/wall_types.ts"

const maze_wall_dictionary:{[key:string]: {[key:string]: {[key:string]: string}}} = {
    [wall_types.wall]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    },
    [wall_types.gate]: {
        "light": {"side": side_wall_dark, "front": gate_light},
        "dark": {"side": side_wall_dark, "front": gate_dark},
        "normal": {"side": side_wall_dark, "front": gate},
    },
    [wall_types.hall]: {
        "light": {"side": "", "front": ""},
        "dark": {"side": "", "front": ""},
        "normal": {"side": "", "front": ""},
    }
}

export default maze_wall_dictionary