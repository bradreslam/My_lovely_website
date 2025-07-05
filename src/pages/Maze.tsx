import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_layout from "../dictionary's/maze_layout.ts";
import {room} from "../classes/maze_room.ts"
import React from "react";
import {wall_types} from "../enums/wall_types.ts";

const Maze: React.FC = () => {

    let current_room:room = maze_layout[1]
    let Facing:Direction
    //let snake_location:number[] = []
    //const snake_origin:number = 30
    //const snake_path:number[] = []
    const Left_wall:HTMLImageElement = document.getElementById("left_wall") as HTMLImageElement;
    const Right_wall:HTMLImageElement = document.getElementById("right_wall") as HTMLImageElement;
    const Wall:HTMLImageElement = document.getElementById("wall") as HTMLImageElement;
    const Floor:HTMLImageElement = document.getElementById("floor") as HTMLImageElement;
    const Ceiling:HTMLImageElement = document.getElementById("ceiling") as HTMLImageElement;

    const move = () => {
        if(current_room.getWall(Facing) === wall_types.gate || current_room.getWall(Facing) === wall_types.hall){
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
        if (current_room != null) {
            const Y = parseInt(new URLSearchParams(window.location.search).get("Y")||"",10)
            const X = parseInt(new URLSearchParams(window.location.search).get("X")||"",10)
            const current_location:number = X + Y-1 * 7
            if (current_room.index_number === current_location)
            {
            if (Left_wall != null && Right_wall != null && Floor != null && Wall != null) 
                {
                    if (Facing != 0)
                    {
                        const src = maze_dictionary[current_room[Facing-1+"wall" as keyof room]]["normal"]["side"]
                        if(src != null && typeof src == "string")
                        {
                            Left_wall.src = src
                        }
                    }
                    else{
                        Left_wall.src = maze_dictionary[current_room[Direction[3]+"_wall" as keyof room]]
                    }
                    Wall.src = maze_dictionary[current_room[Facing+'_wall' as keyof room]]
                    if (Facing != 3)
                    {
                        Right_wall.src = maze_dictionary[current_room[Facing+1+"_wall" as keyof room]]
                    }
                    else{
                        Right_wall.src = maze_dictionary[current_room[Direction[0]+"_wall" as keyof room]]
                    }
                    Floor.src = maze_dictionary["floor"]
                }
            }
        }
    }

    //const updateSnake = () => {
    //    let snake_location:number | null = localStorage.getItem("Snake")
    //    if (snake_location === null)
    //    {
    //        snake_location = snake_origin
    //        localStorage.setItem("snake", snake_location)
    //    }
    //    else
    //    {
    //        snake_location = snake_path[snake_path.indexOf(snake_location)+1]
    //    }
    //}

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