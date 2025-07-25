import side_wall_light from "../assets/maze_assets/side_wall_light.png"
import back_wall_dark from "../assets/maze_assets/back_wall_dark.png"
import back_wall from "../assets/maze_assets/back_wall.png"
import back_wall_light from "../assets/maze_assets/back_wall_light.png"
import side_wall_dark from "../assets/maze_assets/side_wall_dark.png"
import side_wall from "../assets/maze_assets/side_wall.png"
import gate from "../assets/maze_assets/gate.png"
import gate_dark from "../assets/maze_assets/gate_dark.png"
import gate_light from "../assets/maze_assets/gate_light.png"
import side_gate from "../assets/maze_assets/side_gate.png"
import side_gate_dark from "../assets/maze_assets/side_gate_dark.png"
import side_gate_light from "../assets/maze_assets/side_gate_light.png"
import side_hall from "../assets/maze_assets/side_hall.png"
import side_hall_dark from "../assets/maze_assets/side_hall_dark.png"
import side_hall_light from "../assets/maze_assets/side_hall_light.png"
import empty from "../assets/maze_assets/empty.png"
import {wall_types} from "../enums/wall_types.ts"

const maze_wall_dictionary:{[key:string]: {[key:string]: {[key:string]: string}}} = {
    [wall_types.wall]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    },
    [wall_types.gate]: {
        "light": {"side": side_gate_light, "front": gate_light},
        "dark": {"side": side_gate_dark, "front": gate_dark},
        "normal": {"side": side_gate, "front": gate},
    },
    [wall_types.hall]: {
        "light": {"side": side_hall_light, "front": empty},
        "dark": {"side": side_hall_dark, "front": empty},
        "normal": {"side": side_hall, "front": empty},
    },
    [wall_types.door1]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    },
    [wall_types.door2]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    },
    [wall_types.door3]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    }
}

export default maze_wall_dictionary