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
import stair from "../assets/maze_assets/stair.png"
import stair_dark from "../assets/maze_assets/stair_dark.png"
import chest from "../assets/maze_assets/chest.png"
import chest_open from "../assets/maze_assets/chest_open.png"
import side_chest from "../assets/maze_assets/chest_side.png"
import side_chest_open from "../assets/maze_assets/chest_side_open.png"
import chest_dark from "../assets/maze_assets/chest_dark.png"
import side_chest_dark from "../assets/maze_assets/chest_side_dark.png"
import inventory from "../assets/maze_assets/inventory.png"
import inventory_toggle from "../assets/maze_assets/inventory_open_button.png"
import {torch_state} from "../enums/torch_state.ts"
import {Interactable_types} from "../enums/interactable_types.ts"
import {Lightlevel} from "../enums/lightlevel.ts"

const maze_dictionary = {
    "ceiling":{
        [Lightlevel.normal]: ceiling,
        [Lightlevel.dark]: ceiling_dark,
        [Lightlevel.light]: ceiling_light,
        "": empty
    },
    "floor": floor,
    "torch":{
        [torch_state.on]:{"side": side_torch, "front": torch},
        [torch_state.off]:{"side": side_torch_off, "front": torch_off},
        [Lightlevel.dark]:{"side": side_torch_off_dark, "front": torch_off_dark},
    },
    "inventory": inventory,
    "inventory_toggle": inventory_toggle,
    [Interactable_types.stair]:{
        [Lightlevel.dark]: stair_dark,
        [Lightlevel.normal]: stair,
        [Lightlevel.light]: empty,
        "hitbox":{"side": empty, "front":empty}
    },
    [Interactable_types.chest]:{
        [Lightlevel.normal]:{"side": side_chest, "front": chest, "side_open": side_chest_open, "front_open":chest_open},
        [Lightlevel.dark]:{"side": side_chest_dark, "front": chest_dark, "side_open": side_chest_open, "front_open":chest_open},
        [Lightlevel.light]:{"side": empty, "front": empty, "side_open": side_chest_open, "front_open":chest_open},
    },
    [Interactable_types.nest]:{
        [Lightlevel.normal]:{"side": empty, "front": empty},
        [Lightlevel.dark]:{"side": empty, "front": empty},
        [Lightlevel.light]:{"side": empty, "front": empty},
        "hitbox":{"side": empty, "front":empty}
    }
}

export default maze_dictionary