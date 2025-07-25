import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_wall_dictionary from "../dictionary's/maze_wall_dictionary.ts";
import maze_layout from "../dictionary's/maze_layout.ts";
import React, {useEffect, useState} from "react";
import {wall_types} from "../enums/wall_types.ts";
import {useParams, useNavigate} from "react-router-dom";

const Maze: React.FC = () => {

    const { X, Y } = useParams<{ X: string; Y: string }>();
    const navigate = useNavigate();
    const [currentRoom, setCurrentRoom] = useState(maze_layout[8])
    const [facing, setFacing] = useState(Direction.N)
    //let snake_location:number[] = []
    //const snake_origin:number = 30
    //const snake_path:number[] = []
    const [leftWallSrc, setLeftWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["side"]);
    const [rightWallSrc, setRightWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["side"]);
    const [wallSrc, setWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["front"]);
    const [floorSrc, setFloorSrc] = useState(maze_dictionary["floor"]);
    const [ceilingSrc, setCeilingSrc] = useState(maze_dictionary["ceiling"]["normal"]);

    useEffect(() => {
        updateRoom()
    }, []);

    useEffect(() => {
        updateRoom()
    }, [currentRoom, facing, navigate]);

    const move = () => {
        if(currentRoom.getWall(facing) === wall_types.gate || currentRoom.getWall(facing) === wall_types.hall){
            switch(facing){
                case Direction.N: 
                    {
                        if (!Y) {
                            console.error("Missing parameters");
                            return;
                        }
                        const y = parseInt(Y, 10);
                        if ( isNaN(y)) {
                            console.error("Invalid X or Y");
                            return;
                        }
                        navigate(`/maze/${X}/${y+1}`)
                    break; }
                
                case Direction.E:
                    { if (!X) {
                        console.error("Missing parameters");
                        return;
                    }
                        const x = parseInt(X, 10);
                        if ( isNaN(x)) {
                            console.error("Invalid X or Y");
                            return;
                        }
                        navigate(`/maze/${x+1}/${Y}`)
                        break; }
                
                case Direction.S:
                    { if (!Y) {
                        console.error("Missing parameters");
                        return;
                    }
                        const y = parseInt(Y, 10);
                        if ( isNaN(y)) {
                            console.error("Invalid X or Y");
                            return;
                        }
                        navigate(`/maze/${X}/${y-1}`)
                        break; }
                case Direction.W:
                    { if (!X) {
                        console.error("Missing parameters");
                        return;
                    }
                        const x = parseInt(X, 10);
                        if ( isNaN(x)) {
                            console.error("Invalid X or Y");
                            return;
                        }
                        navigate(`/maze/${x-1}/${Y}`)
                        break; }
            }
        }
    }

    const updateRoom = () => {
        if (currentRoom != null) {
            if (!X || !Y) {
                console.error("Missing parameters");
                return;
            }
            const x = parseInt(X, 10);
            const y = parseInt(Y, 10);
            if (isNaN(x) || isNaN(y)) {
                console.error("Invalid X or Y");
                return;
            }
            const current_location:number = x + ((y-1) * 7)
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
                if(currentRoom.Ceiling){
                    setCeilingSrc(maze_dictionary["ceiling"]["normal"])
                }
                else{
                    setCeilingSrc(maze_dictionary["ceiling"][""])
                }
            }
            else{
                setCurrentRoom(maze_layout[current_location])
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
            if (facing == 3){
                setFacing(Direction.N)
            }
            else{
                setFacing(facing + 1)
            }
        }
        else{
            if (facing != 0){
                setFacing(facing - 1)
            }
            else{
                setFacing(Direction.W)
            }
        }
    }

    return (
        <>
            <div className="flex_box">
                <div className="maze_container">
                    <img id="floor" className="floor" src={floorSrc} alt="floor not found"/>
                    <img id="left_wall" className="left_wall" src={leftWallSrc}
                         alt="left_wall not found"/>
                    <img id="right_wall" className="right_wall" src={rightWallSrc}
                         alt="right_wall not found"/>
                    <img id="wall" className="wall" src={wallSrc} alt="wall not found"/>
                    <img id="ceiling" className="ceiling" src={ceilingSrc} alt="ceiling not found"/>
                    <button className="left_turn" onClick={() => turn(true)}/>
                    <button className="forward" onClick={move}/>
                    <button className="right_turn" onClick={() => turn(false)}/>
                </div>
            </div>
        </>
    );
};

export default Maze