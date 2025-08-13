import React from "react";
import {Interactable_types} from "../enums/interactable_types.ts";

const chestForwardHitbox: React.CSSProperties = {
    top: "58%",
    left: "40%",
    width: "20%",
    height: "19%"
};
const chestSideHitbox: React.CSSProperties = {
    top: "64%",
    left: "10%",
    width: "28%",
    height: "26%",
}

const hitbox_dictionary:{[key:number]:{[key:string]:React.CSSProperties}} = {
    [Interactable_types.stair]:{
        "side": chestSideHitbox, "front":chestForwardHitbox
    },
    [Interactable_types.chest]:{
        "side": chestSideHitbox, "front":chestForwardHitbox
    },
    [Interactable_types.nest]:{
       "side": chestSideHitbox, "front":chestForwardHitbox
    }
}
export default hitbox_dictionary;