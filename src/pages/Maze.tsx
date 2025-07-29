import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_wall_dictionary from "../dictionary's/maze_wall_dictionary.ts";
import maze_layout from "../dictionary's/maze_layout.ts";
import React, {useEffect, useState} from "react";
import ceiling_darkness from "../assets/maze_assets/no_ceiling_darkness.png";
import {wall_types} from "../enums/wall_types.ts";
import {useNavigate, useParams} from "react-router-dom";

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
    const [leftBackWallSrc, setLeftBackWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["side"]);
    const [rightBackWallSrc, setRightBackWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["side"]);
    const [leftFrontWallSrc, setLeftFrontWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["side"]);
    const [rightFrontWallSrc, setRightFrontWallSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["side"]);
    const [leftFrontCeilingSrc, setLeftFrontCeilingSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["ceiling"]);
    const [rightFrontCeilingSrc, setRightFrontCeilingSrc] = useState(maze_wall_dictionary[wall_types.wall]["normal"]["ceiling"]);
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
                let left_wall_direction:Direction
                if (facing != 0) {
                    left_wall_direction = facing-1
                } else {
                    left_wall_direction = Direction.W
                }
                const leftWall = currentRoom.getWall(left_wall_direction)
                setLeftWallSrc(maze_wall_dictionary[leftWall]["normal"]["side"]);
                if (leftWall === wall_types.gate || leftWall === wall_types.hall){
                    const next_room = get_next_room(left_wall_direction,x,y)
                    setLeftBackWallSrc(maze_wall_dictionary[next_room.getWall(facing)]["normal"]["front"])
                }
                else{
                    setLeftBackWallSrc(maze_dictionary["ceiling"][""])
                }

                let right_wall_direction:Direction
                if (facing != 3) {
                    right_wall_direction = facing+1
                } else {
                    right_wall_direction = Direction.N
                }
                const right_wall = currentRoom.getWall(right_wall_direction)
                setRightWallSrc(maze_wall_dictionary[right_wall]["normal"]["side"]);
                if (right_wall === wall_types.gate || right_wall === wall_types.hall){
                    const next_room = get_next_room(right_wall_direction,x,y)
                    setRightBackWallSrc(maze_wall_dictionary[next_room.getWall(facing)]["normal"]["front"])
                }
                else{
                    setRightBackWallSrc(maze_dictionary["ceiling"][""])
                }
                const wall = currentRoom.getWall(facing)
                setWallSrc(maze_wall_dictionary[wall]["normal"]["front"]);
                if(wall === wall_types.gate || wall === wall_types.hall){
                    const next_room = get_next_room(facing,x,y)
                    setLeftFrontWallSrc(maze_wall_dictionary[next_room.getWall(left_wall_direction)]["normal"]["side"])
                    setRightFrontWallSrc(maze_wall_dictionary[next_room.getWall(right_wall_direction)]["normal"]["side"])
                    if(!next_room.Ceiling || !currentRoom.Ceiling){
                        setLeftFrontCeilingSrc(maze_wall_dictionary[next_room.getWall(right_wall_direction)]["normal"]["ceiling"])
                        setRightFrontCeilingSrc(maze_wall_dictionary[next_room.getWall(left_wall_direction)]["normal"]["ceiling"])
                    }
                    else if(leftFrontCeilingSrc !== maze_dictionary["ceiling"][""]){
                        setLeftFrontCeilingSrc(maze_dictionary["ceiling"][""])
                        setRightFrontCeilingSrc(maze_dictionary["ceiling"][""])
                    }
                }
                else if(leftFrontWallSrc !== maze_dictionary["ceiling"][""]){
                    setRightFrontWallSrc(maze_dictionary["ceiling"][""])
                    setLeftFrontWallSrc(maze_dictionary["ceiling"][""])
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

    const get_next_room = (direction:Direction, x:number, y:number) => {
        switch(direction){
            case Direction.N:{
                return maze_layout[x + ((y) * 7)]
                }

            case Direction.E:{
                return maze_layout[x + ((y-1) * 7)+1]
                }

            case Direction.S:{
                return maze_layout[x + ((y-2) * 7)]
                }

            case Direction.W:{
                return maze_layout[x + ((y-1) * 7)-1]
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
                    <img id="left_back_wall" className="left_back_wall" src={leftBackWallSrc}
                         alt="left_wall not found"/>
                    <img id="left_wall_front" className="left_wall_front" src={leftFrontWallSrc}
                         alt="left_wall_front not found"/>
                    <img id="right_wall" className="right_wall" src={rightWallSrc}
                         alt="right_wall not found"/>
                    <img id="right_back_wall" className="right_back_wall" src={rightBackWallSrc}
                         alt="right_wall not found"/>
                    <img id="right_wall_front" className="right_wall_front" src={rightFrontWallSrc}
                         alt="right_wall_front not found"/>
                    <img id="wall" className="wall" src={wallSrc} alt="wall not found"/>
                    <img id="ceiling" className="ceiling" src={ceilingSrc} alt="ceiling not found"/>
                    <img id="ceiling_darkness" className="front_ceiling" src={ceiling_darkness} alt="ceiling darkness not found"/>
                    <img id="front_ceiling_left" className="front_ceiling_left" src={rightFrontCeilingSrc}  alt="front_ceiling not found"/>
                    <img id="front_ceiling_right" className="front_ceiling_right" src={leftFrontCeilingSrc} alt="front_ceiling not found"/>
                    <button className="left_turn" onClick={() => turn(true)}/>
                    <button className="forward" onClick={move}/>
                    <button className="right_turn" onClick={() => turn(false)}/>
                </div>
            </div>
        </>
    );
};

export default Maze