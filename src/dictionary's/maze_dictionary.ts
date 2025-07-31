import ceiling from "../assets/maze_assets/ceiling.png"
import ceiling_dark from "../assets/maze_assets/ceiling_dark.png"
import ceiling_light from "../assets/maze_assets/ceiling_light.png"
import floor from "../assets/maze_assets/floor.png"
import empty from "../assets/maze_assets/empty.png"
import torch from "../assets/maze_assets/back_torch_on.png"
import torch_off from "../assets/maze_assets/back_torch_off.png"
import torch_off_dark from "../assets/maze_assets/back_torch_off_dark.png"
import side_torch from "../assets/maze_assets/side_torch_on.png"
import side_torch_off from "../assets/maze_assets/side_torch_off.png"
import side_torch_off_dark from "../assets/maze_assets/side_torch_off_dark.png"

const maze_dictionary = {
    "ceiling":{
        "normal": ceiling,
        "dark": ceiling_dark,
        "light": ceiling_light,
        "": empty
    },
    "floor": floor,
    "torch":{
        true:{"side": side_torch, "front": torch},
        false:{"side": side_torch_off, "front": torch_off},
        "dark":{"side": side_torch_off_dark, "front": torch_off_dark},
    }
}

export default maze_dictionary