import "../styling/Maze.css";
import {Direction} from "../enums/direction.ts";
import maze_dictionary from "../dictionary's/maze_dictionary.ts"
import maze_wall_dictionary from "../dictionary's/maze_wall_dictionary.ts";
import maze_layout from "../dictionary's/maze_layout.ts";
import React, {useCallback, useEffect, useState} from "react";
import ceiling_darkness from "../assets/maze_assets/no_ceiling_darkness.png";
import ceiling_side_darkness from "../assets/maze_assets/ceiling_side_darkness.png";
import back_darkness from "../assets/maze_assets/back_darkness.png";
import backpack_map from "../assets/maze_assets/backpack_map.png";
import backpack_compass from "../assets/maze_assets/backpack_compass.png";
import {wall_types} from "../enums/wall_types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {room} from "../classes/maze_room.ts";
import empty from "../assets/maze_assets/empty.png";
import {torch_state} from "../enums/torch_state.ts";
import {Interactable_types} from "../enums/interactable_types.ts";
import {Lightlevel} from "../enums/lightlevel.ts";
import {item} from "../enums/items.ts";
import maze_item_dictionary from "../dictionary's/maze_item_dictionary.ts";
import hitbox_dictionary from "../dictionary's/maze_interactable_hitbox.ts";

const Maze: React.FC = () => {

    const { X, Y } = useParams<{ X: string; Y: string }>();
    const [inventory, setInventory] = useState<item[]>([]);
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
    const [inventoryOpen, setInventoryOpen] = useState(true);
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
    const [frontItemLeft, setFrontItemLeft] = useState(true)
    const [frontItemStair, setFrontItemStair] = useState(false);
    const [itemLeft, setItemLeft] = useState(true)
    const [itemSrc, setItemSrc] = useState(empty);
    const [frontItemSrc, setFrontItemSrc] = useState(empty);
    const [currentRoomLightLevel, setCurrentRoomLightLevel] = useState(Lightlevel.normal);
    const [heldItem, setHeldItem] = useState<item | null>(null);
    const [itemHitbox, setItemHitbox] = useState<React.CSSProperties>(
        hitbox_dictionary[Interactable_types.chest]["front"]);

    const inventory_add_item = (Item:item)=> {
        if(Item === item.map){
            sessionStorage.setItem("map", "true")
        }
        else if(Item === item.compass){
            sessionStorage.setItem("compass", "true")
        }
        else{
            setInventory(prev => {
                const updated = [...prev, Item];
                sessionStorage.setItem("items", JSON.stringify(updated));
                return updated;
            });
        }
    }

    const inventory_remove_item = (item:item)=> {
        setInventory(inventory.splice(inventory.indexOf(item)))
        sessionStorage.setItem("items", JSON.stringify(inventory))
    }

    const inventory_hold_item = (item:item)=> {
        document.body.style.cursor = `url(${maze_item_dictionary[item]}), auto`;
        setHeldItem(item)
    }

    const move = useCallback((forwards:boolean) => {
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
    },[X, Y, currentRoom, facing, navigate])

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

    const set_current_room_item = useCallback(() => {
        const exit_maze = (location:string) => {
            if (location === "home"){
                navigate('/')
            }
            else if (location === "left_tower"){
                navigate('/left_tower')
            }
            else{
                navigate('/right_tower')
            }
        }
        
        if(currentRoom.Interactable !== null){
            const item = currentRoom.Interactable
            setItemLeft(true)
            if(item.interactable === Interactable_types.stair){
                if(currentRoomLightLevel != Lightlevel.dark){
                    if(currentRoom.index_number === 1){
                        exit_maze("home")
                    }
                    else if(currentRoom.index_number === 7){
                        exit_maze("right_tower")
                    }
                    else{
                        exit_maze("left_tower")
                    }
                }
                else{
                    if(currentRoom.index_number === 1){
                        navigate(`/maze/1/2`)
                    }
                    else if(currentRoom.index_number === 7){
                        navigate(`/maze/7/2`)
                    }
                    else{
                        navigate(`/maze/2/7`)
                    }
                }
            }
            else{
                if(item.interactable == Interactable_types.chest
                    && sessionStorage.getItem("chest"+currentRoom.index_number) == "open"){
                    if(item.orientation === facing){
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["front_open"])
                    }
                    else if(facing != Direction.N && facing != Direction.W){
                        if(item.orientation === facing-1){
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                        }
                        else if(item.orientation === facing+1){
                            setItemLeft(false)
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                        }
                        else{
                            setItemSrc(empty)
                        }
                    }
                    else if(facing === Direction.N){
                        if(item.orientation === Direction.E){
                            setItemLeft(false)
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                        }
                        else if(item.orientation === Direction.W){
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                        }
                        else{
                            setItemSrc(empty)
                        }
                    }
                    else{
                        if(item.orientation === Direction.S){
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                        }
                        else if(item.orientation === Direction.N){
                            setItemLeft(false)
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                        }
                        else{
                            setItemSrc(empty)
                        }

                    }
                }
                else if(item.orientation === facing){
                    setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["front"])
                    setItemHitbox(hitbox_dictionary[item.interactable]["front"])
                }
                else if(facing != Direction.N && facing != Direction.W){
                    if(item.orientation === facing-1){
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                        setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                    }
                    else if(item.orientation === facing+1){
                        setItemLeft(false)
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                        setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                    }
                    else{
                        setItemSrc(empty)
                        //setItemHitbox("")
                    }
                }
                else if(facing === Direction.N){
                    if(item.orientation === Direction.E){
                        setItemLeft(false)
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                        setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                    }
                    else if(item.orientation === Direction.W){
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                        setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                    }
                    else{
                        setItemSrc(empty)
                        //setItemHitbox("")
                    }
                }
                else{
                    if(item.orientation === Direction.S){
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                        setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                    }
                    else if(item.orientation === Direction.N){
                        setItemLeft(false)
                        setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                        setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                    }
                    else{
                        setItemSrc(empty)
                        //setItemHitbox("")
                    }
                }
            }
        }
        else{
            setItemSrc(empty)
            //setItemHitbox("")
        }
    },[currentRoom.Interactable, currentRoom.index_number, currentRoomLightLevel, facing, navigate]);

    const item_interact = () => {
        if(currentRoomLightLevel != Lightlevel.dark){
            if(currentRoom.Interactable?.interactable === Interactable_types.chest
                && sessionStorage.getItem("chest"+currentRoom.index_number) !== "open"){
                sessionStorage.setItem("chest"+currentRoom.index_number, "open");
                set_current_room_item()
                if(currentRoom.Interactable.item != null){
                    inventory_add_item(currentRoom.Interactable.item)
                }
            }
        }
    }

    const updateRoom = useCallback(() => {
        const set_current_room_torch = () =>{
            if(currentRoom.torch !== null){
                const torch = currentRoom.torch
                setTorchDirection(true)
                if(torch.orientation == facing)
                    setTorchSrc(maze_dictionary["torch"][torch.lit]["front"])
                else if(facing != Direction.N && facing != Direction.W){
                    if(torch.orientation === facing-1){
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
                    }
                    else if(torch.orientation === facing+1){
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
                    }
                    else{
                        setTorchSrc(empty)
                    }
                }
                else if(facing === Direction.N){
                    if(torch.orientation === Direction.E){
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"]) //right
                    }
                    else if(torch.orientation === Direction.W){
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
                    }
                    else{
                        setTorchSrc(empty)
                    }
                }
                else{
                    if(torch.orientation === Direction.S){
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
                    }
                    else if(torch.orientation === Direction.N){
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
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

        const set_next_room_torch = (next_room:room, nextRoomLightLevel:Lightlevel) =>{
            if(next_room.torch != null){
                const torch = next_room.torch
                setFrontTorchDirection(true)
                if(nextRoomLightLevel != Lightlevel.dark){
                    if(torch.orientation != facing){
                        if(torch.orientation === facing-1 ||
                            facing === Direction.N && torch.orientation === Direction.W){
                            setFrontTorch(maze_dictionary["torch"][torch.lit]["side"])
                        }
                        else{
                            setFrontTorchDirection(false)
                            setFrontTorch(maze_dictionary["torch"][torch.lit]["side"])
                        }
                    }
                    else{
                        setFrontTorch(maze_dictionary["torch"][torch.lit]["front"])
                    }
                }
                else{
                    if(torch.orientation != facing){
                        setFrontTorch(maze_dictionary["torch"][Lightlevel.dark]["side"])
                    }
                    else{
                        setFrontTorch(maze_dictionary["torch"][Lightlevel.dark]["front"])
                    }
                }
            }
            else{
                setFrontTorch(empty)
            }
        }

        const set_next_room_item = (next_room:room, nextRoomLightLevel:Lightlevel) =>{
            if(next_room.Interactable != null){
                const item = next_room.Interactable
                setFrontItemLeft(true)
                if(item.interactable === Interactable_types.stair){
                    setFrontItemStair(true)
                    setFrontItemSrc(maze_dictionary[Interactable_types.stair][nextRoomLightLevel])
                }
                else{
                    setFrontItemStair(false)
                    if(item.interactable === Interactable_types.chest &&
                        sessionStorage.getItem("chest"+next_room.index_number) == "open"){
                        if(item.orientation != facing){
                            if(item.orientation === facing-1 ||
                                facing === Direction.N && item.orientation === Direction.W){
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side_open"])
                            }
                            else{
                                setFrontItemLeft(false)
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side_open"])
                            }
                        }
                        else{
                            setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["front_open"])
                        }
                    }
                    else{
                        if(item.orientation != facing){
                            if(item.orientation === facing-1 ||
                                facing === Direction.N && item.orientation === Direction.W){
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side"])
                            }
                            else{
                                setFrontItemLeft(false)
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side"])
                            }
                        }
                        else{
                            setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["front"])
                        }
                    }
                }
            }
            else{
                setFrontItemSrc(empty)
            }
        }

        const get_light_level = (Room: room) => {
            if(Room.torch?.lit === torch_state.on){
                return Lightlevel.light
            }
            else{
                const N_wall= Room.getWall(Direction.N)
                if(N_wall === wall_types.gate || N_wall === wall_types.hall){
                    const N_room = get_next_room(Direction.N, Room.index_number)
                    if(N_room.torch?.lit === torch_state.on){
                        return Lightlevel.normal
                    }
                }
                const E_wall= Room.getWall(Direction.E)
                if(E_wall === wall_types.gate || E_wall === wall_types.hall){
                    const E_room = get_next_room(Direction.E, Room.index_number)
                    if(E_room.torch?.lit === torch_state.on){
                        return Lightlevel.normal
                    }
                }
                const S_wall= Room.getWall(Direction.S)
                if(S_wall === wall_types.gate || S_wall === wall_types.hall){
                    const S_room = get_next_room(Direction.S, Room.index_number)
                    if(S_room.torch?.lit === torch_state.on){
                        return Lightlevel.normal
                    }
                }
                const W_wall= Room.getWall(Direction.W)
                if(W_wall === wall_types.gate || W_wall === wall_types.hall){
                    const W_room = get_next_room(Direction.W, Room.index_number)
                    if(W_room.torch?.lit === torch_state.on){
                        return Lightlevel.normal
                    }
                }
                return Lightlevel.dark
            }
        }

        setCurrentRoomLightLevel(get_light_level(currentRoom))

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
                const wall = currentRoom.getWall(facing)
                let left_wall_direction:Direction
                if (facing != 0) {
                    left_wall_direction = facing-1
                } else {
                    left_wall_direction = Direction.W
                }
                const leftWall = currentRoom.getWall(left_wall_direction)
                setLeftWallSrc(maze_wall_dictionary[leftWall][currentRoomLightLevel]["side"]);
                if (leftWall === wall_types.gate || leftWall === wall_types.hall){
                    const next_room = get_next_room(left_wall_direction,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(next_room)
                    const leftBackWall = next_room.getWall(facing)
                    setLeftBackWallSrc(maze_wall_dictionary[leftBackWall][nextRoomLightLevel]["front"])
                    if (leftBackWall === wall_types.hall && wall !== wall_types.hall){
                        setLeftFrontSideWallSrc(empty)
                        setLeftFrontSideWallCeilingSrc(empty)
                    }
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
                setRightWallSrc(maze_wall_dictionary[right_wall][currentRoomLightLevel]["side"]);
                if (right_wall === wall_types.gate || right_wall === wall_types.hall){
                    const next_room = get_next_room(right_wall_direction,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(next_room)
                    const rightBackWall = next_room.getWall(facing)
                    setRightBackWallSrc(maze_wall_dictionary[rightBackWall][nextRoomLightLevel]["front"])
                    if (rightBackWall === wall_types.hall && wall !== wall_types.hall){
                        setRightFrontSideWallSrc(empty)
                        setRightFrontSideWallCeilingSrc(empty)
                    }
                }
                else{
                    setRightBackWallSrc(maze_dictionary["ceiling"][""])
                }

                set_current_room_torch()
                set_current_room_item()

                setWallSrc(maze_wall_dictionary[wall][currentRoomLightLevel]["front"]);
                if(wall === wall_types.gate || wall === wall_types.hall){
                    const next_room = get_next_room(facing,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(next_room)
                    setWallFrontSrc(maze_wall_dictionary[next_room.getWall(facing)][nextRoomLightLevel]["front"])
                    if(wall === wall_types.hall){
                        const leftFrontWall = next_room.getWall(left_wall_direction)
                        setLeftFrontWallSrc(maze_wall_dictionary[leftFrontWall][nextRoomLightLevel]["side"])
                        if(leftFrontWall === wall_types.hall || leftFrontWall === wall_types.gate){
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
                    set_next_room_item(next_room,nextRoomLightLevel)
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
                    setCeilingSrc(maze_dictionary["ceiling"][currentRoomLightLevel])
                }
                else{
                    setCeilingSrc(empty)
                }
            }
            else{
                setCurrentRoom(maze_layout[current_location])
            }
        }
    }, [X, Y, currentRoom, currentRoomLightLevel, facing, leftFrontCeilingSrc, rightFrontCeilingSrc, set_current_room_item, wallFrontSrc])

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

    const turn = useCallback((direction:boolean) => {
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
    },[facing])

    useEffect(() => {
        const clickHandler = () => {
            const wall = currentRoom.getWall(facing)
            if (wall === wall_types.door1 && heldItem === item.key1){
                sessionStorage.setItem("door1","open")
                inventory_remove_item(heldItem)
                setHeldItem(null)
                maze_layout[43].E_wall = wall_types.gate
                maze_layout[44].W_Wall = wall_types.gate
            }
            else if (wall === wall_types.door2 && heldItem === item.key2){
                sessionStorage.setItem("door2","open")
                inventory_remove_item(heldItem)
                setHeldItem(null)
                maze_layout[22].E_wall = wall_types.gate
                maze_layout[23].W_Wall = wall_types.gate
            }
            else if (wall === wall_types.door3 && heldItem === item.key3){
                sessionStorage.setItem("door3","open")
                inventory_remove_item(heldItem)
                setHeldItem(null)
                maze_layout[24].E_wall = wall_types.gate
                maze_layout[25].W_Wall = wall_types.gate
            }
            else if (heldItem === item.matches && currentRoom.torch?.lit === torch_state.off) {
                sessionStorage.setItem("torch"+currentRoom.index_number,"lit")
                setHeldItem(null)
                const torch = maze_layout[currentRoom.index_number].torch;
                if (torch != null) {
                    torch.lit = torch_state.on;
                }
            }
            else{
                setHeldItem(null)
            }
            document.body.style.cursor = `default`;
        }

        const keyDownHandler = (event: KeyboardEvent) => {
            if(event.code === "ArrowUp" || event.code === "KeyW"){
                move(true)
            }
            else if(event.code === "ArrowDown" || event.code === "KeyS"){
                move(false)
            }
            else if(event.code === "ArrowLeft" || event.code === "KeyA"){
                turn(true)
            }
            else if(event.code === "ArrowRight" || event.code === "KeyD"){
                turn(false)
            }
            else if(event.code === "KeyZ" || event.code === "KeyE"){
                setInventoryOpen(!inventoryOpen)
            }
        }

        const initGameData = () =>{
            if (sessionStorage.getItem("door1") === "open"){
                maze_layout[43].E_wall = wall_types.gate
                maze_layout[44].W_Wall = wall_types.gate
            }
            if (sessionStorage.getItem("door2") === "open"){
                maze_layout[22].E_wall = wall_types.gate
                maze_layout[23].W_Wall = wall_types.gate
            }
            if (sessionStorage.getItem("door3") === "open"){
                maze_layout[24].E_wall = wall_types.gate
                maze_layout[25].W_Wall = wall_types.gate
            }
            const raw = sessionStorage.getItem("items");
            const parsed: item[] = raw ? JSON.parse(raw) : [];
            setInventory(parsed)
        }
        
        initGameData()
        updateRoom()
        //const items = JSON.parse(localStorage.getItem('items') as string);
        //if (items) {
            //setInventory(items);
        //}
        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("mousedown", clickHandler);
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
            window.removeEventListener("mousedown", clickHandler);
        }
    }, [currentRoom, facing, heldItem, inventoryOpen, move, turn, updateRoom], );

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
                    <img id="left_side_wall_front_ceiling" className="left_side_wall_front_ceiling"
                         src={leftFrontSideWallCeilingSrc}
                         alt="wall ceiling not found"/>
                    <img id="right_side_wall_front" className="right_side_wall_front" src={rightFrontSideWallSrc}
                         alt="right_side_wall not found"/>
                    <img id="right_side_wall_front_ceiling" className="right_side_wall_front_ceiling"
                         src={rightFrontSideWallCeilingSrc}
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
                    <img id="back_darkness" className="back_darkness" src={back_darkness}
                         alt="back_darkness not found"/>
                    <button className="left_turn" style={{
                        zIndex: heldItem == null ? "" : "0"
                    }} onClick={() => turn(true)}/>
                    <button className="forward" style={{
                        zIndex: heldItem == null ? "" : "0"
                    }} onClick={() => move(true)}/>
                    <button className="backward" style={{
                        zIndex: heldItem == null ? "" : "0"
                    }} onClick={() => move(false)}/>
                    <button className="right_turn" style={{
                        zIndex: heldItem == null ? "" : "0"
                    }} onClick={() => turn(false)}/>
                    <img id="torch" className="torch" src={torchSrc} alt="torch not found" style={{
                        transform: torchLeft ? 'none' : 'scaleX(-1)'
                    }}/>
                    <img id="front_torch" className="front_torch" src={frontTorchSrc} alt="front torch not found"
                         style={{
                             transform: `translate(-50%, -50%) scale(45%) translateY(-6%) translateX(1%) ${frontTorchLeft ? '' : 'scaleX(-1)'}`
                         }}/>
                    <img id="item" className="item" src={itemSrc} alt="item not found" style={{
                        transform: `${itemLeft ? '' : 'scaleX(-1)'}`
                    }}/>
                    <button id="item_trigger" disabled={itemSrc === empty} className="item_trigger" style={{...itemHitbox,
                        right: !itemLeft? `${itemHitbox.left}` : "",
                        left: itemLeft ? `${itemHitbox.left}` : "",
                        zIndex: itemHitbox != null && heldItem == null ? "51": "0",
                    }} onClick={item_interact}/>
                    <img id="front_item" className="front_item" src={frontItemSrc} alt="item not found" style={{
                        transform: `${frontItemStair ? "" : "translate(-50%, -50%) scale(45%) translateY(-6%) translateX(1%)"} ${frontItemLeft ? '' : 'scaleX(-1)'}`,
                        top: `${frontItemStair ? "" : "50%"}`,
                        left: `${frontItemStair ? "" : "50%"}`
                    }}/>
                    <div id="inventory" className="inventory" style={{
                        transform: inventoryOpen ? "translateX(-85%)" : "none",
                        transition: 'transform 1s ease',
                    }}>
                        <ul className="inventory_list">
                            {inventory.map((item) => (
                                <li key={item} className="inventory_slot">
                                    <button className="inventory_slot_trigger" onClick={() => inventory_hold_item(item)} disabled={heldItem !== null}/>
                                    <img className="inventory_slot_icon" src={maze_item_dictionary[item]} alt="item"/></li>
                            ))}
                        </ul>
                        <img id="inventory_background" className="inventory_background" alt="inventory"
                             src={maze_dictionary["inventory"]}/>
                        <button className="inventory_toggle" onClick={() => setInventoryOpen(!inventoryOpen)}>
                            <img className="inventory_toggle_icon" src={maze_dictionary["inventory_toggle"]}
                                 alt="toggle" style={{
                                transform: !inventoryOpen ? "rotate(180deg) translateX(-10%) translateY(4%)" : "none",
                                transition: 'transform 1s ease'
                            }}/>
                        </button>
                        <img id="map" className="map" alt="map_binder" src={sessionStorage.getItem("map") === "true" ? backpack_map : empty}/>
                        <img id="compass" className="compass" alt="compass_hanger" src={sessionStorage.getItem("compass") === "true" ? backpack_compass : empty}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Maze