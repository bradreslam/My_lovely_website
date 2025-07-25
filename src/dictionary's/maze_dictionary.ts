import ceiling from "../assets/maze_assets/ceiling.png"
import ceiling_dark from "../assets/maze_assets/ceiling_dark.png"
import ceiling_light from "../assets/maze_assets/ceiling_light.png"
import floor from "../assets/maze_assets/floor.png"
import empty from "../assets/maze_assets/empty.png"

const maze_dictionary = {
    "ceiling":{
        "normal": ceiling,
        "dark": ceiling_dark,
        "light": ceiling_light,
        "": empty
    },
    "floor": floor,
}

export default maze_dictionary