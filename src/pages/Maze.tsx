import "../styling/Maze.css"
import side_wall from "../assets/maze_assets/side_wall.png"
import floor from "../assets/maze_assets/floor.png"
import wall from "../assets/maze_assets/back_wall.png"
import ceiling from "../assets/maze_assets/ceiling.png"
import React from "react";

const Maze: React.FC = () => {
    return (
        <>
            <div className="flex_box">
                <div className="maze_container">
                    <img className="floor" src={floor} alt="floor not found"/>
                    <img className="left_wall" src={side_wall} alt="left_wall not found"/>
                    <img className="right_wall" src={side_wall} alt="right_wall not found"/>
                    <img className="wall" src={wall} alt="wall not found"/>
                    <img className="ceiling" src ={ceiling} alt="ceiling not found"/>
                </div>
            </div>
            <button className="left_turn"/>
            <button className="forward"/>
            <button className="right_turn"/>
        </>
    );
};

export default Maze