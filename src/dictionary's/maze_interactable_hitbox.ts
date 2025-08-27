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
const snakeSize1: React.CSSProperties = {
    transform: "scale(50%) translateY(-56%) translateX(1%)"
}

const snakeSize1Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-56%) translateX(1%) scaleX(-1)"
}

const snakeSize2: React.CSSProperties = {
    transform: "scale(50%) translateY(-58%) translateX(1%) scaleY(80%)"
}

const snakeSize2Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-58%) translateX(1%) scaleX(-1) scaleY(80%)"
}

const snakeSize3: React.CSSProperties = {
    transform: "scale(50%) translateY(-60%) translateX(1%) scaleY(60%)"
}

const snakeSize3Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-60%) translateX(1%) scaleX(-1) scaleY(60%)"
}

const snakeSize4: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%) scaleY(40%)"
}

const snakeSize4Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%) scaleX(-1) scaleY(40%)"
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
    },
    1:{"normal": snakeSize1, "turned": snakeSize1Turned},
    2:{"normal": snakeSize2, "turned": snakeSize2Turned},
    3:{"normal": snakeSize3, "turned": snakeSize3Turned},
    4:{"normal": snakeSize4, "turned": snakeSize4Turned},
}
export default hitbox_dictionary;