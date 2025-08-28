import {item} from "../enums/items.ts";
import key1 from "../assets/maze_assets/key1.png"
import key2 from "../assets/maze_assets/key3.png"
import key3 from "../assets/maze_assets/key3.png"
import egg from "../assets/maze_assets/egg.png"
import cannon_ball from "../assets/maze_assets/cannon_ball.png"
import matches from "../assets/maze_assets/flint.png"
import map from "../assets/maze_assets/map.png"
import compass from "../assets/maze_assets/compass.png"

const maze_item_dictionary = {
    [item.egg]:egg,
    [item.key1]:key1,
    [item.key2]:key2,
    [item.key3]:key3,
    [item.cannonball]:cannon_ball,
    [item.matches]:matches,
    [item.compass]:compass,
    [item.map]:map,
}
export default maze_item_dictionary;