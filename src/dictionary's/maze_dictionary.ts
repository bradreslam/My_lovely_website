import side_wall_light from "../../public/maze_assets/side_wall_light.png"
import back_wall_dark from "../../public/maze_assets/back_wall_dark.png"
import ceiling from "../../public/maze_assets/ceiling.png"
import back_wall from "../../public/maze_assets/back_wall.png"
import back_wall_light from "../../public/maze_assets/back_wall_light.png"
import ceiling_dark from "../../public/maze_assets/ceiling_dark.png"
import side_wall_dark from "../../public/maze_assets/side_wall_dark.png"
import side_wall from "../../public/maze_assets/side_wall.png"
import floor from "../../public/maze_assets/floor.png"
import {wall_types} from "../enums/wall_types.ts"

const maze_dictionary = {
    [wall_types.wall]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    },
    "Ceilings":{
        "ceiling": ceiling,
        "ceiling_dark": ceiling_dark,
    },
    "floor": floor,
}

export default maze_dictionary