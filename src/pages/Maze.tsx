import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_layout from "../dictionary's/maze_layout.ts";
import {room} from "../classes/maze_room.ts"
import React from "react";
import {wall_types} from "../enums/wall_types.ts";

const Maze: React.FC = () => {

    let current_room:room;
    let current_room_index:number;
    let Facing:Direction;
    const Left_wall:HTMLImageElement = document.getElementById("left_wall") as HTMLImageElement;
    const Right_wall:HTMLImageElement = document.getElementById("right_wall") as HTMLImageElement;
    const Wall:HTMLImageElement = document.getElementById("wall") as HTMLImageElement;
    const Floor:HTMLImageElement = document.getElementById("floor") as HTMLImageElement;
    const Ceiling:HTMLImageElement = document.getElementById("ceiling") as HTMLImageElement;

    window.onload = () => {
        const Y = parseInt(new URLSearchParams(window.location.search).get("Y")||"",10)
        const X = parseInt(new URLSearchParams(window.location.search).get("X")||"",10)
        current_room_index = X+Y*(X-1)
        updateRoom()
    };

    const move = () => {
        if(current_room.getWall(Facing) === wall_types.gate || current_room.getWall(Facing) === null){
            switch(Facing){
                case Direction.N: 
                    { const Y = parseInt(new URLSearchParams(window.location.search).get("Y")||"",10)+1
                        const params = new URLSearchParams(window.location.search);
                        params.set("Y",Y.toString())
                        history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
                        updateRoom()
                    break; }
                
                case Direction.E:
                    { const X = parseInt(new URLSearchParams(window.location.search).get("X")||"",10)+1
                        const params = new URLSearchParams(window.location.search);
                        params.set("X",X.toString())
                        history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
                        updateRoom()
                    break; }
                
                case Direction.S:
                    { const Y = parseInt(new URLSearchParams(window.location.search).get("Y")||"",10)-1
                        const params = new URLSearchParams(window.location.search);
                        params.set("Y",Y.toString())
                        history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
                        updateRoom()
                    break; }
                case Direction.W:
                    { const X = parseInt(new URLSearchParams(window.location.search).get("X")||"",10)-1
                        const params = new URLSearchParams(window.location.search);
                        params.set("X",X.toString())
                        history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
                        updateRoom()
                    break; }
            }
        }
    }

    const updateRoom = () => {
        const Y = parseInt(new URLSearchParams(window.location.search).get("Y")||"",10)
        const X = parseInt(new URLSearchParams(window.location.search).get("X")||"",10)
        if(current_room_index != X+Y*(X-1))
        {
            current_room_index = X+Y*(X-1)
            current_room = maze_layout[current_room_index]
        }
        if (current_room != null) {
            if (Left_wall != null && Right_wall != null && Floor != null) {
                Left_wall.src = maze_dictionary[current_room.N_wall]
                Wall.src = maze_dictionary[current_room.E_wall]["normal"]["front"]
                Right_wall.src = maze_dictionary[current_room.S_wall]["normal"]["side"]
                Floor.src = maze_dictionary["floor"]
                Ceiling.src = maze_dictionary["Ceilings"]["ceiling"]
            }
        }
    }

    const turn = (direction:boolean) => {
        if(!direction){
            if (Facing != 3){
                Facing = 0
                updateRoom()
            }
            else{
                Facing += 1
                updateRoom()
            }
        }
        else{
            if (Facing != 0){
                Facing -= 1
                updateRoom()
            }
            else{
                Facing = 3
                updateRoom()
            }
        }
    }

    return (
        <>
            <div className="flex_box">
                <div className="maze_container">
                    <img id="floor" className="floor" alt="floor not found"/>
                    <img id="left_wall" className="left_wall" alt="left_wall not found"/>
                    <img id="right_wall" className="right_wall" alt="right_wall not found"/>
                    <img id="wall" className="wall" alt="wall not found"/>
                    <img id="ceiling" className="ceiling" alt="ceiling not found"/>
                </div>
            </div>
            <button className="left_turn" onClick={() => turn(true)}/>
            <button className="forward" onClick={move}/>
            <button className="right_turn" onClick={() => turn(false)}/>
        </>
    );
};

export default Maze