import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_wall_dictionary from "../dictionary's/maze_wall_dictionary.ts";
import maze_layout from "../dictionary's/maze_layout.ts";
import React, {useEffect, useState} from "react";
import {wall_types} from "../enums/wall_types.ts";

const Maze: React.FC = () => {

    const [currentRoom, setCurrentRoom] = useState(maze_layout[8])
    const [facing, setFacing] = useState(Direction.N)
    //let snake_location:number[] = []
    //const snake_origin:number = 30
    //const snake_path:number[] = []
    const [leftWallSrc, setLeftWallSrc] = useState("");
    const [rightWallSrc, setRightWallSrc] = useState("");
    const [wallSrc, setWallSrc] = useState("");
    const [floorSrc, setFloorSrc] = useState("");
    const [ceilingSrc, setCeilingSrc] = useState("");

    useEffect(() => {
        updateRoom()
    }, []);

    const move = () => {
        if(currentRoom.getWall(facing) === wall_types.gate || currentRoom.getWall(facing) === wall_types.hall){
            switch(facing){
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
        if (currentRoom != null) {
            const Y = parseInt(new URLSearchParams(window.location.search).get("Y")||"",10)
            const X = parseInt(new URLSearchParams(window.location.search).get("X")||"",10)
            const current_location:number = X + Y-1 * 7
            if (currentRoom.index_number === current_location) {
                if (facing != 0) {
                setLeftWallSrc(maze_wall_dictionary[currentRoom.getWall(facing - 1)]["normal"]["side"]);
                } else {
                setLeftWallSrc(maze_wall_dictionary[currentRoom.getWall(Direction.W)]["normal"]["side"]);
                }
                setWallSrc(maze_wall_dictionary[currentRoom.getWall(facing)]["normal"]["front"]);
                if (facing != 3) {
                setRightWallSrc(maze_wall_dictionary[currentRoom.getWall(facing + 1)]["normal"]["side"]);
                } else {
                setRightWallSrc(maze_wall_dictionary[currentRoom.getWall(Direction.N)]["normal"]["side"]);
                }
                    setFloorSrc(maze_dictionary["floor"])
                    setCeilingSrc(maze_dictionary["Ceilings"]["ceiling"])
                }
                else{
                    setCurrentRoom(maze_layout[current_location])
                    updateRoom()
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
            if (facing != 3){
                setFacing(Direction.N)
                updateRoom()
            }
            else{
                setFacing(facing + 1)
                updateRoom()
            }
        }
        else{
            if (facing != 0){
                setFacing(facing - 1)
                updateRoom()
            }
            else{
                setFacing(Direction.W)
                updateRoom()
            }
        }
    }

    return (
        <>
            <div className="flex_box">
                <div className="maze_container">
                    <img id="floor" className="floor" src={floorSrc} alt="floor not found"/>
                    <img id="left_wall" className="left_wall" src={leftWallSrc} alt="left_wall not found"/>
                    <img id="right_wall" className="right_wall" src={rightWallSrc} alt="right_wall not found"/>
                    <img id="wall" className="wall" src={wallSrc}alt="wall not found"/>
                    <img id="ceiling" className="ceiling" src={ceilingSrc} alt="ceiling not found"/>
                </div>
            </div>
            <button className="left_turn" onClick={() => turn(true)}/>
            <button className="forward" onClick={move}/>
            <button className="right_turn" onClick={() => turn(false)}/>
        </>
    );
};

export default Maze