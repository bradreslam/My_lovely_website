import React, {useEffect, useState} from "react";
import maze_item_dictionary from "../dictionary's/maze_item_dictionary.ts";
import maze_dictionary from "../dictionary's/maze_dictionary.ts";
import backpack_map from "../assets/maze_assets/backpack_map.png";
import empty from "../assets/maze_assets/empty.png";
import backpack_compass from "../assets/maze_assets/backpack_compass.png";
import {item} from "../enums/items.ts";
import {useNavigate} from "react-router-dom";
import background from "../assets/maze_assets/right_tower_background.png";

const RightTower: React.FC = () => {
    const [inventoryOpen, setInventoryOpen] = useState(true);
    const [inventory, setInventory] = useState<item[]>([]);
    const [heldItem, setHeldItem] = useState<item | null>(null);
    const navigate = useNavigate();

    const inventory_hold_item = (item:item)=> {
        document.body.style.cursor = `url(${maze_item_dictionary[item]}), auto`;
        setHeldItem(item)
    }

    useEffect(() => {
        const clickHandler = () => {
            setHeldItem(null)
            document.body.style.cursor = `default`;
        }
        const raw = sessionStorage.getItem("items");
        const parsed: item[] = raw ? JSON.parse(raw) : [];
        setInventory(parsed)
        window.addEventListener("mousedown", clickHandler);
    }, [])

    return (
        <div className="flex_box">
            <div className="maze_container">
                <img src={background} alt="background" className="background"/>
                <button className="stairs_right" onClick={() => navigate("/maze/7/2")} style={{
                    zIndex: heldItem == null ? "" : "-2"
                }}/>
                <div id="inventory" className="inventory" style={{
                    transform: inventoryOpen ? "translateX(-85%)" : "none",
                    transition: 'transform 1s ease',
                }}>
                    <ul className="inventory_list">
                        {inventory.map((item) => (
                            <li key={item} className="inventory_slot">
                                <button className="inventory_slot_trigger" onClick={() => inventory_hold_item(item)}
                                        disabled={heldItem !== null}/>
                                <img className="inventory_slot_icon" src={maze_item_dictionary[item]} alt="item"/></li>
                        ))}
                    </ul>
                    <img id="inventory_background" className="inventory_background" alt="inventory"
                         src={maze_dictionary["inventory"]}/>
                    <button className="inventory_toggle" onClick={() => setInventoryOpen(!inventoryOpen)}>
                        <img className="inventory_toggle_icon" src={maze_dictionary["inventory_toggle"]}
                             alt="toggle" style={{
                            transform: !inventoryOpen ? "rotate(180deg) translateX(-10%) translateY(4%)" : "none",
                            transition: 'transform 1s ease'
                        }}/>
                    </button>
                    <img id="map" className="map" alt="map_binder"
                         src={sessionStorage.getItem("map") === "true" ? backpack_map : empty}/>
                    <img id="compass" className="compass" alt="compass_hanger"
                         src={sessionStorage.getItem("compass") === "true" ? backpack_compass : empty}/>
                </div>
            </div>
        </div>
    )
}
export default RightTower;