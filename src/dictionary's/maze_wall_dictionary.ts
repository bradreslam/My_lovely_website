import side_wall_light from "../assets/maze_assets/side_wall_light.png"
import back_wall_dark from "../assets/maze_assets/back_wall_dark.png"
import back_wall from "../assets/maze_assets/back_wall.png"
import back_wall_light from "../assets/maze_assets/back_wall_light.png"
import side_wall_dark from "../assets/maze_assets/side_wall_dark.png"
import side_wall from "../assets/maze_assets/side_wall.png"
import ceiling_wall from "../assets/maze_assets/no_ceiling.png"
import ceiling_wall_dark from "../assets/maze_assets/no_ceiling_dark.png"
import ceiling_gate from "../assets/maze_assets/no_ceiling_gate.png"
import ceiling_gate_dark from "../assets/maze_assets/no_ceiling_gate_dark.png"
import gate from "../assets/maze_assets/gate.png"
import gate_dark from "../assets/maze_assets/gate_dark.png"
import gate_light from "../assets/maze_assets/gate_light.png"
import side_gate from "../assets/maze_assets/side_gate.png"
import side_gate_dark from "../assets/maze_assets/side_gate_dark.png"
import side_gate_light from "../assets/maze_assets/side_gate_light.png"
import side_hall from "../assets/maze_assets/side_hall.png"
import side_hall_dark from "../assets/maze_assets/side_hall_dark.png"
import side_hall_light from "../assets/maze_assets/side_hall_light.png"
import ceiling_side_hall from "../assets/maze_assets/side_hall_ceiling.png"
import ceiling_side_hall_dark from "../assets/maze_assets/side_hall_ceiling_dark.png"
import gate_ceiling from "../assets/maze_assets/back_gate_ceiling.png"
import gate_ceiling_dark from "../assets/maze_assets/back_gate_ceiling_dark.png"
import wall_ceiling_dark from "../assets/maze_assets/back_wall_ceiling_dark.png"
import wall_ceiling from "../assets/maze_assets/back_wall_ceiling.png"
import empty from "../assets/maze_assets/empty.png"
import {wall_types} from "../enums/wall_types.ts"

const maze_wall_dictionary:{[key:string]: {[key:string]: {[key:string]: string}}} = {
    [wall_types.wall]: {
        "light": {"side": side_wall_light, "front": back_wall_light, "ceiling_side":ceiling_wall, "ceiling_front":wall_ceiling},
        "dark": {"side": side_wall_dark, "front": back_wall_dark, "ceiling_side":ceiling_wall_dark, "ceiling_front":wall_ceiling_dark},
        "normal": {"side": side_wall, "front": back_wall, "ceiling_side":ceiling_wall, "ceiling_front":wall_ceiling},
    },
    [wall_types.gate]: {
        "light": {"side": side_gate_light, "front": gate_light, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
        "dark": {"side": side_gate_dark, "front": gate_dark, "ceiling_side":ceiling_gate_dark, "ceiling_front":gate_ceiling},
        "normal": {"side": side_gate, "front": gate, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
    },
    [wall_types.hall]: {
        "light": {"side": side_hall_light, "front": empty, "ceiling_side":ceiling_side_hall, "ceiling_front":empty},
        "dark": {"side": side_hall_dark, "front": empty, "ceiling_side":ceiling_side_hall_dark, "ceiling_front":empty},
        "normal": {"side": side_hall, "front": empty, "ceiling_side":ceiling_side_hall, "ceiling_front":empty},
    },
    [wall_types.door1]: {
        "light": {"side": side_wall_light, "front": back_wall_light, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
        "dark": {"side": side_wall_dark, "front": back_wall_dark, "ceiling_side":ceiling_gate_dark, "ceiling_front":gate_ceiling_dark},
        "normal": {"side": side_wall, "front": back_wall, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
    },
    [wall_types.door2]: {
        "light": {"side": side_wall_light, "front": back_wall_light, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
        "dark": {"side": side_wall_dark, "front": back_wall_dark, "ceiling_side":ceiling_gate_dark, "ceiling_front":gate_ceiling_dark},
        "normal": {"side": side_wall, "front": back_wall, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
    },
    [wall_types.door3]: {
        "light": {"side": side_wall_light, "front": back_wall_light, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
        "dark": {"side": side_wall_dark, "front": back_wall_dark, "ceiling_side":ceiling_gate_dark, "ceiling_front":gate_ceiling_dark},
        "normal": {"side": side_wall, "front": back_wall, "ceiling_side":ceiling_gate, "ceiling_front":gate_ceiling},
    }
}

export default maze_wall_dictionary