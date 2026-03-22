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
const nestHitbox: React.CSSProperties = {
    top: "74%",
    left: "43%",
    width: "15%",
    height: "15%",
}

const snakeSize1: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%)"
}

const snakeSize1Still: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%)"
}

const snakeSize1Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(-1%) scaleX(-1)"
}

const snakeSize1StillTurned: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%) scaleX(-1)"
}

const snakeSize2: React.CSSProperties = {
    transform: "scale(50%) translateY(-64%) translateX(1%) scaleY(83%)"
}

const snakeSize2Still: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%)"
}

const snakeSize2Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-64%) translateX(-1%) scaleX(-1) scaleY(83%)"
}

const snakeSize2StillTurned: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%) scaleX(-1)"
}

const snakeSize3: React.CSSProperties = {
    transform: "scale(50%) translateY(-66%) translateX(1%) scaleY(66%)"
}

const snakeSize3Still: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%)"
}

const snakeSize3Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-66%) translateX(-1%) scaleX(-1) scaleY(66%)"
}

const snakeSize3StillTurned: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%) scaleX(-1)"
}

const snakeSize4: React.CSSProperties = {
    transform: "scale(50%) translateY(-68%) translateX(1%) scaleY(49%)"
}

const snakeSize4Still: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%))"
}

const snakeSize4Turned: React.CSSProperties = {
    transform: "scale(50%) translateY(-68%) translateX(-1%) scaleX(-1) scaleY(49%)"
}

const snakeSize4StillTurned: React.CSSProperties = {
    transform: "scale(50%) translateY(-62%) translateX(1%) scaleX(-1)"
}

const hitbox_dictionary:{[key:number]:{[key:string]:React.CSSProperties}} = {
    [Interactable_types.stair]:{
        "side": chestSideHitbox, "front":chestForwardHitbox
    },
    [Interactable_types.chest]:{
        "side": chestSideHitbox, "front":chestForwardHitbox
    },
    [Interactable_types.nest]:{
       "front":nestHitbox
    },
    1:{"normal": snakeSize1, "turned": snakeSize1Turned, "still_turned":snakeSize1StillTurned ,"still_normal":snakeSize1Still},
    2:{"normal": snakeSize2, "turned": snakeSize2Turned, "still_turned":snakeSize2StillTurned ,"still_normal": snakeSize2Still},
    3:{"normal": snakeSize3, "turned": snakeSize3Turned, "still_turned":snakeSize3StillTurned ,"still_normal": snakeSize3Still},
    4:{"normal": snakeSize4, "turned": snakeSize4Turned, "still_turned":snakeSize4StillTurned ,"still_normal": snakeSize4Still},
    5:{"still_turned":snakeSize4StillTurned, "still_normal":snakeSize4Still},
    6:{"still_turned":snakeSize4StillTurned, "still_normal":snakeSize4Still}
}
export default hitbox_dictionary;