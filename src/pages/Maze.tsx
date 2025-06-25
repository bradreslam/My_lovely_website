import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_layout from "../dictionary's/maze_layout.ts"
import React from "react";

const Maze: React.FC = () => {

    let N_Wall:string
    let E_Wall:string
    let S_Wall:string
    let W_Wall:string
    let Object:string
    let Facing:Direction = 0

    const get_room = (X: number, Y: number)=> {
        const room:number = X * Y
        localStorage.getItem(room.toString())
    }

    const move = () => {

    }

    const updateRoom = () => {

    }

    const turn = (direction:boolean) => {
        if(!direction){
            if (Facing != 3){
                Facing = 0
            }
            else{
                Facing += 1
            }
        }
        else{
            if (Facing != 0){
                Facing -= 1
            }
            else{
                Facing = 3
            }
        }
    }

    return (
        <>
            <div className="flex_box">
                <div className="maze_container">
                    <img className="floor" alt="floor not found"/>
                    <img className="left_wall" alt="left_wall not found"/>
                    <img className="right_wall" alt="right_wall not found"/>
                    <img className="wall" alt="wall not found"/>
                    <img className="ceiling" alt="ceiling not found"/>
                </div>
            </div>
            <button className="left_turn" onClick={() => turn(true)}/>
            <button className="forward" onClick={move}/>
            <button className="right_turn" onClick={() => turn(false)}/>
        </>
    );
};

export default Maze