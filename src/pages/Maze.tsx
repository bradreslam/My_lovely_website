import "../styling/Maze.css"
import {Direction} from "../enums/direction.ts"
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_wall_dictionary from "../dictionary's/maze_wall_dictionary.ts";
import maze_layout from "../dictionary's/maze_layout.ts";
import React, {useEffect, useState, useCallback} from "react";
import ceiling_darkness from "../assets/maze_assets/no_ceiling_darkness.png";
import ceiling_side_darkness from "../assets/maze_assets/ceiling_side_darkness.png";
import back_darkness from "../assets/maze_assets/back_darkness.png"
import {wall_types} from "../enums/wall_types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {room} from "../classes/maze_room.ts"
import empty from "../assets/maze_assets/empty.png"
import {torch_state} from "../enums/torch_state.ts";

const Maze: React.FC = () => {

    const { X, Y } = useParams<{ X: string; Y: string }>();
    const navigate = useNavigate();
    const [currentRoom, setCurrentRoom] = useState(maze_layout[8])
    const [facing, setFacing] = useState(Direction.N)
    //let snake_location:number[] = []
    //const snake_origin:number = 30
    //const snake_path:number[] = []
    const [leftWallSrc, setLeftWallSrc] = useState(empty);
    const [rightWallSrc, setRightWallSrc] = useState(empty);
    const [wallSrc, setWallSrc] = useState(empty);
    const [wallFrontSrc, setWallFrontSrc] = useState(empty);
    const [leftBackWallSrc, setLeftBackWallSrc] = useState(empty);
    const [rightBackWallSrc, setRightBackWallSrc] = useState(empty);
    const [leftFrontWallSrc, setLeftFrontWallSrc] = useState(empty);
    const [leftFrontSideWallSrc, setLeftFrontSideWallSrc] = useState(empty);
    const [rightFrontSideWallSrc, setRightFrontSideWallSrc] = useState(empty);
    const [rightFrontWallSrc, setRightFrontWallSrc] = useState(empty);
    const [leftFrontCeilingSrc, setLeftFrontCeilingSrc] = useState(empty);
    const [leftFrontSideWallCeilingSrc, setLeftFrontSideWallCeilingSrc] = useState(empty);
    const [rightFrontSideWallCeilingSrc, setRightFrontSideWallCeilingSrc] = useState(empty);
    const [rightFrontCeilingSrc, setRightFrontCeilingSrc] = useState(empty);
    const [wallFrontCeilingSrc, setWallFrontCeilingSrc] = useState(empty);
    const [floorSrc, setFloorSrc] = useState(empty);
    const [ceilingSrc, setCeilingSrc] = useState(empty);
    const [torchSrc, setTorchSrc] = useState(empty);
    const [torchLeft, setTorchDirection] = useState(true)
    const [frontTorchSrc, setFrontTorch] = useState(empty);
    const [frontTorchLeft, setFrontTorchDirection] = useState(true)

    const move = (forwards:boolean) => {
        let direction = facing
        if(!forwards){
            switch(facing){
                case Direction.N:
                    direction = Direction.S
                    break;
                case Direction.E:
                    direction = Direction.W
                    break;
                case Direction.S:
                    direction = Direction.N
                    break;
                case Direction.W:
                    direction = Direction.E
                    break;
            }
        }
        const wall = currentRoom.getWall(direction)
        if(wall === wall_types.gate || wall === wall_types.hall){
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
                        if (forwards){
                            navigate(`/maze/${X}/${y+1}`)
                        }
                        else{
                            navigate(`/maze/${X}/${y-1}`)
                        }
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
                        if (forwards){
                            navigate(`/maze/${x+1}/${Y}`)
                        }
                        else{
                            navigate(`/maze/${x-1}/${Y}`)
                        }
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
                        if (forwards) {
                            navigate(`/maze/${X}/${y-1}`)
                        }
                        else{
                            navigate(`/maze/${X}/${y+1}`)
                        }
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
                        if(forwards){
                            navigate(`/maze/${x-1}/${Y}`)
                        }
                        else{
                            navigate(`/maze/${x+1}/${Y}`)
                        }
                        break; }
            }
        }
    }

    const get_next_room = (direction:Direction, location:number) => {
        switch(direction){
            case Direction.N:{
                return maze_layout[location+7]
            }

            case Direction.E:{
                return maze_layout[location+1]
            }

            case Direction.S:{
                return maze_layout[location-7]
            }

            case Direction.W:{
                return maze_layout[location-1]
            }
        }
    }

    const updateRoom = useCallback(() => {
        const set_current_room_torch = () =>{
            if(currentRoom.torch !== null){
                setTorchDirection(true)
                if(currentRoom.torch.orientation == facing)
                    setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["front"])
                else if(facing != Direction.N && facing != Direction.W){
                    if(currentRoom.torch.orientation === facing-1){
                        setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["side"])
                    }
                    else if(currentRoom.torch.orientation === facing+1){
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["side"])
                    }
                    else{
                        setTorchSrc(empty)
                    }
                }
                else if(facing === Direction.N){
                    if(currentRoom.torch.orientation === Direction.E){
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["side"]) //right
                    }
                    else if(currentRoom.torch.orientation === Direction.W){
                        setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["side"])
                    }
                    else{
                        setTorchSrc(empty)
                    }
                }
                else{
                    if(currentRoom.torch.orientation === Direction.S){
                        setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["side"])
                    }
                    else if(currentRoom.torch.orientation === Direction.N){
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][currentRoom.torch.lit]["side"])
                    }
                    else{
                        setTorchSrc(empty)
                    }
                }
            }
            else{
                setTorchSrc(empty)
            }
        }

        const set_next_room_torch = (next_room:room, nextRoomLightLevel:string) =>{
            if(next_room.torch != null){
                setFrontTorchDirection(true)
                if(nextRoomLightLevel != "dark"){
                    if(next_room.torch.orientation != facing){
                        if(next_room.torch.orientation === facing-1 ||
                            facing === Direction.N && next_room.torch.orientation === Direction.W){
                            setFrontTorch(maze_dictionary["torch"][next_room.torch.lit]["side"])
                        }
                        else{
                            setFrontTorchDirection(false)
                            setFrontTorch(maze_dictionary["torch"][next_room.torch.lit]["side"])
                        }
                    }
                    else{
                        setFrontTorch(maze_dictionary["torch"][next_room.torch.lit]["front"])
                    }
                }
                else{
                    if(next_room.torch.orientation != facing){
                        setFrontTorch(maze_dictionary["torch"]["dark"]["side"])
                    }
                    else{
                        setFrontTorch(maze_dictionary["torch"]["dark"]["front"])
                    }
                }
            }
            else{
                setFrontTorch(empty)
            }
        }

        const get_light_level = (Room: room) => {
            if(Room.torch?.lit === torch_state.on){
                return "light"
            }
            else{
                const N_wall= Room.getWall(Direction.N)
                if(N_wall === wall_types.gate || N_wall === wall_types.hall){
                    const N_room = get_next_room(Direction.N, Room.index_number)
                    if(N_room.torch?.lit === torch_state.on){
                        return "normal"
                    }
                }
                const E_wall= Room.getWall(Direction.E)
                if(E_wall === wall_types.gate || E_wall === wall_types.hall){
                    const E_room = get_next_room(Direction.E, Room.index_number)
                    if(E_room.torch?.lit === torch_state.on){
                        return "normal"
                    }
                }
                const S_wall= Room.getWall(Direction.S)
                if(S_wall === wall_types.gate || S_wall === wall_types.hall){
                    const S_room = get_next_room(Direction.S, Room.index_number)
                    if(S_room.torch?.lit === torch_state.on){
                        return "normal"
                    }
                }
                const W_wall= Room.getWall(Direction.W)
                if(W_wall === wall_types.gate || W_wall === wall_types.hall){
                    const W_room = get_next_room(Direction.W, Room.index_number)
                    if(W_room.torch?.lit === torch_state.on){
                        return "normal"
                    }
                }
                return "dark"
            }
        }

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
                const lightLevelCurrentRoom = get_light_level(currentRoom)
                let left_wall_direction:Direction
                if (facing != 0) {
                    left_wall_direction = facing-1
                } else {
                    left_wall_direction = Direction.W
                }
                const leftWall = currentRoom.getWall(left_wall_direction)
                setLeftWallSrc(maze_wall_dictionary[leftWall][lightLevelCurrentRoom]["side"]);
                if (leftWall === wall_types.gate || leftWall === wall_types.hall){
                    const next_room = get_next_room(left_wall_direction,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(next_room)
                    setLeftBackWallSrc(maze_wall_dictionary[next_room.getWall(facing)][nextRoomLightLevel]["front"])
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
                setRightWallSrc(maze_wall_dictionary[right_wall][lightLevelCurrentRoom]["side"]);
                if (right_wall === wall_types.gate || right_wall === wall_types.hall){
                    const next_room = get_next_room(right_wall_direction,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(next_room)
                    setRightBackWallSrc(maze_wall_dictionary[next_room.getWall(facing)][nextRoomLightLevel]["front"])
                }
                else{
                    setRightBackWallSrc(maze_dictionary["ceiling"][""])
                }

                set_current_room_torch()

                const wall = currentRoom.getWall(facing)
                setWallSrc(maze_wall_dictionary[wall][lightLevelCurrentRoom]["front"]);
                if(wall === wall_types.gate || wall === wall_types.hall){
                    const next_room = get_next_room(facing,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(next_room)
                    setWallFrontSrc(maze_wall_dictionary[next_room.getWall(facing)][nextRoomLightLevel]["front"])
                    if(wall === wall_types.hall){
                        const leftFrontWall = next_room.getWall(left_wall_direction)
                        setLeftFrontWallSrc(maze_wall_dictionary[leftFrontWall][nextRoomLightLevel]["side"])
                        if(leftFrontWall === wall_types.hall){
                            const leftSideRoom = get_next_room(left_wall_direction,next_room.index_number)
                            const leftSideRoomLightLevel = get_light_level(leftSideRoom)
                            setLeftFrontSideWallSrc(maze_wall_dictionary[leftSideRoom.getWall(facing)][leftSideRoomLightLevel]["front"])
                            setLeftFrontSideWallCeilingSrc(maze_wall_dictionary[leftSideRoom.getWall(facing)][leftSideRoomLightLevel]["ceiling_front"])
                        }
                        const rightFrontWall = next_room.getWall(right_wall_direction)
                        setRightFrontWallSrc(maze_wall_dictionary[rightFrontWall][nextRoomLightLevel]["side"])
                        if(rightFrontWall === wall_types.hall){
                            const rightNextRoom = get_next_room(right_wall_direction,next_room.index_number)
                            const rightNextRoomLightLevel = get_light_level(rightNextRoom)
                            setRightFrontSideWallSrc(maze_wall_dictionary[rightNextRoom.getWall(facing)][rightNextRoomLightLevel]["front"])
                            setRightFrontSideWallCeilingSrc(maze_wall_dictionary[rightNextRoom.getWall(facing)][rightNextRoomLightLevel]["ceiling_front"])
                        }
                        if(!next_room.Ceiling || !currentRoom.Ceiling){
                            setLeftFrontCeilingSrc(maze_wall_dictionary[next_room.getWall(left_wall_direction)][nextRoomLightLevel]["ceiling_side"])
                            setRightFrontCeilingSrc(maze_wall_dictionary[next_room.getWall(right_wall_direction)][nextRoomLightLevel]["ceiling_side"])
                            setWallFrontCeilingSrc(maze_wall_dictionary[next_room.getWall(facing)][nextRoomLightLevel]["ceiling_front"])
                        }
                        else if(leftFrontCeilingSrc !== empty || rightFrontCeilingSrc !== empty){
                            setLeftFrontCeilingSrc(empty)
                            setRightFrontCeilingSrc(empty)
                            setWallFrontCeilingSrc(empty)
                        }
                    }
                    set_next_room_torch(next_room,nextRoomLightLevel)
                }
                else if(wallFrontSrc !== empty) {
                    setWallFrontSrc(empty)
                    setRightFrontWallSrc(empty)
                    setLeftFrontWallSrc(empty)
                    setRightFrontSideWallSrc(empty)
                    setRightFrontSideWallCeilingSrc(empty)
                    setLeftFrontSideWallSrc(empty)
                    setLeftFrontSideWallCeilingSrc(empty)
                    setLeftFrontCeilingSrc(empty)
                    setRightFrontCeilingSrc(empty)
                    setWallFrontCeilingSrc(empty)

                }
                setFloorSrc(maze_dictionary["floor"])
                if(currentRoom.Ceiling){
                    setCeilingSrc(maze_dictionary["ceiling"][lightLevelCurrentRoom])
                }
                else{
                    setCeilingSrc(empty)
                }
            }
            else{
                setCurrentRoom(maze_layout[current_location])
            }
        }
    }, [X, Y, currentRoom, facing, leftFrontCeilingSrc, rightFrontCeilingSrc, wallFrontSrc])

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

    useEffect(() => {
        updateRoom()
    }, );

    useEffect(() => {
        updateRoom()
    }, [currentRoom, facing, navigate, updateRoom]);

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
                    <img id="wall_front" className="wall_front" src={wallFrontSrc} alt="wall not found"/>
                    <img id="left_side_wall_front" className="left_side_wall_front" src={leftFrontSideWallSrc}
                         alt="left_side_wall not found"/>
                    <img id ="left_side_wall_front_ceiling" className="left_side_wall_front_ceiling" src={leftFrontSideWallCeilingSrc}
                         alt="wall ceiling not found"/>
                    <img id="right_side_wall_front" className="right_side_wall_front" src={rightFrontSideWallSrc}
                         alt="right_side_wall not found"/>
                    <img id="right_side_wall_front_ceiling" className="right_side_wall_front_ceiling" src={rightFrontSideWallCeilingSrc}
                         alt="wall ceiling not found"/>
                    <img id="side_wall_front_ceiling_darkness" className="side_darkness" src={ceiling_side_darkness}
                         alt="ceiling darkness not found"/>
                    <img id="wall_front_ceiling" className="wall_front_ceiling" src={wallFrontCeilingSrc}
                         alt="wall not found"/>
                    <img id="ceiling" className="ceiling" src={ceilingSrc} alt="ceiling not found"/>
                    <img id="ceiling_darkness" className="front_ceiling" src={ceiling_darkness}
                         alt="ceiling darkness not found"/>
                    <img id="front_ceiling_left" className="front_ceiling_left" src={rightFrontCeilingSrc}
                         alt="front_ceiling not found"/>
                    <img id="front_ceiling_right" className="front_ceiling_right" src={leftFrontCeilingSrc}
                         alt="front_ceiling not found"/>
                    <img id="back_darkness" className="back_darkness" src={back_darkness} alt="back_darkness not found"/>
                    <button className="left_turn" onClick={() => turn(true)}/>
                    <button className="forward" onClick={() => move(true)}/>
                    <button className="backward" onClick={() => move(false)}/>
                    <button className="right_turn" onClick={() => turn(false)}/>
                    <img id="torch" className="torch" src={torchSrc} alt="torch not found" style={{
                        transform: torchLeft? 'none': 'scaleX(-1)'
                    }}/>
                    <img id="front_torch" className="front_torch" src={frontTorchSrc} alt="front torch not found" style={{
                        transform: `translate(-50%, -50%) scale(45%) translateY(-6%) translateX(1%) ${frontTorchLeft? '': 'scaleX(-1)'}`
                    }}/>
                </div>
            </div>
        </>
    );
};

export default Maze