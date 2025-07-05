import side_wall_light from "../../public/maze_assets/side_wall_light.png"
import back_wall_dark from "../../public/maze_assets/back_wall_dark.png"
import back_wall from "../../public/maze_assets/back_wall.png"
import back_wall_light from "../../public/maze_assets/back_wall_light.png"
import side_wall_dark from "../../public/maze_assets/side_wall_dark.png"
import side_wall from "../../public/maze_assets/side_wall.png"
import {wall_types} from "../enums/wall_types.ts"

const maze_wall_dictionary = {
    [wall_types.wall]: {
        "light": {"side": side_wall_light, "front": back_wall_light},
        "dark": {"side": side_wall_dark, "front": back_wall_dark},
        "normal": {"side": side_wall, "front": back_wall},
    }
}

export default maze_wall_dictionary