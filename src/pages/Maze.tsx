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
import maze_snake from "../dictionary's/maze_snake.ts"
import hitbox_dictionary from "../dictionary's/maze_interactable_hitbox.ts";

const Maze: React.FC = () => {

    const { X, Y } = useParams<{ X: string; Y: string }>();
    const [inventory, setInventory] = useState<item[]>([]);
    const navigate = useNavigate();
    const [currentRoom, setCurrentRoom] = useState(maze_layout[8])
    const [nextRoom, setNextRoom] = useState(maze_layout[9]);
    const [facing, setFacing] = useState(Direction.N)
    const [snakeBody, setSnakeBody] = useState<number[]>([])
    const [snakeStyle, setSnakeStyle] = useState<React.CSSProperties>(
        hitbox_dictionary[0]
    )
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
    const [nextRoomLightLevel, setNextRoomLightLevel] = useState(Lightlevel.normal)
    const [heldItem, setHeldItem] = useState<item | null>(null);
    const [snakeLeft, setSnakeLeft] = useState(empty);
    const [snakeRight, setSnakeRight] = useState(empty);
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

    const inventory_hold_item = (item:item)=> {
        document.body.style.cursor = `url(${maze_item_dictionary[item]}), auto`;
        setHeldItem(item)
    }

    function relativeDirection(from: Direction, to: Direction): number {
        return (to - from + 4) % 4;
    }
    
    const navigate_player = useCallback((direction:Direction)=>{
        switch(direction){
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
    }, [X, Y, navigate])

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
        const room = get_next_room(direction, currentRoom.index_number)
        if(wall === wall_types.gate && !snakeBody.includes(room.index_number)
            || wall === wall_types.hall && !snakeBody.includes(room.index_number)){
            navigate_player(direction)
        }
    },[currentRoom, facing, navigate_player, snakeBody])

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
                const dir = relativeDirection(facing,item.orientation)
                if(item.interactable == Interactable_types.chest
                    && sessionStorage.getItem("chest"+currentRoom.index_number) == "open"){
                    switch(dir){
                        case 0:
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["front_open"])
                            break;
                        case 1:
                            setItemLeft(false)
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                            break;
                        case 2:
                            setItemSrc(empty)
                            break;
                        case 3:
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side_open"])
                            break;
                    }
                }
                else {
                    switch (dir) {
                        case 0:
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["front"])
                            setItemHitbox(hitbox_dictionary[item.interactable]["front"])
                            break;
                        case 1:
                            setItemLeft(false)
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                            setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                            break;
                        case 2:
                            setItemSrc(empty)
                            break;
                        case 3:
                            setItemSrc(maze_dictionary[item.interactable][currentRoomLightLevel]["side"])
                            setItemHitbox(hitbox_dictionary[item.interactable]["side"])
                            break;
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

    const renderSnake = useCallback((snake_body: number[], nextRoom: room) => {
        const facing_wall = currentRoom.getWall(facing)
        if(facing_wall === wall_types.gate && snake_body.includes(nextRoom.index_number)
            || facing_wall === wall_types.hall && snake_body.includes(nextRoom.index_number)){
            let snakeTurned:boolean = false;
            if(nextRoom.index_number === snake_body[0]){
                setSnakeRight(empty)
                let snake_dir:Direction
                if(snake_body[0]+1 === snake_body[1]){
                    snake_dir = Direction.E
                }
                else if(snake_body[0]-1 === snake_body[1]){
                    snake_dir = Direction.W
                }
                else if(snake_body[0]+7 === snake_body[1]){
                    snake_dir = Direction.N
                }
                else{
                    snake_dir=Direction.S
                }
                const dir = relativeDirection(facing, snake_dir)
                switch (dir){
                    case 0:
                        setSnakeLeft(maze_snake["left"]["head"]["front"][nextRoomLightLevel])
                        break;
                    case 1:
                        if(nextRoom.getWall(snake_dir) === wall_types.gate){
                            setSnakeLeft(maze_snake["left"]["head"]["side"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeLeft(maze_snake["left"]["head"]["side"]["normal"][nextRoomLightLevel])
                        }
                        break;
                    case 2:
                        setSnakeLeft(empty)
                        break;
                    case 3:
                        snakeTurned = true
                        if(nextRoom.getWall(snake_dir) === wall_types.gate){
                            setSnakeLeft(maze_snake["left"]["head"]["side"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeLeft(maze_snake["left"]["head"]["side"]["normal"][nextRoomLightLevel])
                        }
                        break;
                }
                if (snakeTurned) {
                    setSnakeStyle(hitbox_dictionary[1]["turned"])
                }
                else{
                    setSnakeStyle(hitbox_dictionary[1]["normal"])
                }
            }
            else if(nextRoom.index_number === snake_body[5]){
                setSnakeRight(empty)
                let snake_dir:Direction
                if(snake_body[5]+1 === snake_body[4]){
                    snake_dir = Direction.E
                }
                else if(snake_body[5]-1 === snake_body[4]){
                    snake_dir = Direction.W
                }
                else if(snake_body[5]+7 === snake_body[4]){
                    snake_dir = Direction.N
                }
                else{
                    snake_dir=Direction.S
                }
                const dir = relativeDirection(facing, snake_dir)
                switch (dir){
                    case 0:
                        setSnakeLeft(maze_snake["left"]["tail"]["front"][nextRoomLightLevel])
                        break;
                    case 1:
                        snakeTurned = true
                        if(nextRoom.getWall(snake_dir) === wall_types.gate){
                            setSnakeLeft(maze_snake["left"]["tail"]["side"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeLeft(maze_snake["left"]["tail"]["side"]["normal"][nextRoomLightLevel])
                        }
                        break;
                    case 2:
                        setSnakeLeft(empty)
                        break;
                    case 3:
                        if(nextRoom.getWall(snake_dir) === wall_types.gate){
                            setSnakeLeft(maze_snake["left"]["tail"]["side"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeLeft(maze_snake["left"]["tail"]["side"]["normal"][nextRoomLightLevel])
                        }
                        break;
                }
                if (snakeTurned) {
                    setSnakeStyle(hitbox_dictionary[1]["turned"])
                }
                else{
                    setSnakeStyle(hitbox_dictionary[1]["normal"])
                }
            }
            else{
                const visible_snake = snake_body.indexOf(nextRoom.index_number)
                const snake_from = visible_snake+1
                let snake_right:Direction
                if(snake_body[visible_snake]+1 === snake_body[snake_from]){
                    snake_right = Direction.E
                }
                else if(snake_body[visible_snake]-1 === snake_body[snake_from]){
                    snake_right = Direction.W
                }
                else if(snake_body[visible_snake]+7 === snake_body[snake_from]){
                    snake_right = Direction.N
                }
                else{
                    snake_right=Direction.S
                }
                const right_dir = relativeDirection(facing, snake_right)
                switch (right_dir){
                    case 0:
                        setSnakeRight(maze_snake["right"]["body"]["turn"][nextRoomLightLevel])
                        break;
                    case 1:
                        if(nextRoom.getWall(snake_right) === wall_types.gate){
                            setSnakeRight(maze_snake["right"]["body"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeRight(maze_snake["right"]["body"]["normal"][nextRoomLightLevel])
                        }
                        break;
                    case 2:
                        setSnakeRight(empty)
                        break;
                    case 3:
                        snakeTurned = true
                        if(nextRoom.getWall(snake_right) === wall_types.gate){
                            setSnakeRight(maze_snake["right"]["body"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeRight(maze_snake["right"]["body"]["normal"][nextRoomLightLevel])
                        }
                        break;
                }

                const snake_to = visible_snake-1
                let snake_left:Direction
                if(snake_body[visible_snake]+1 === snake_body[snake_to]){
                    snake_left = Direction.E
                }
                else if(snake_body[visible_snake]-1 === snake_body[snake_to]){
                    snake_left = Direction.W
                }
                else if(snake_body[visible_snake]+7 === snake_body[snake_to]){
                    snake_left = Direction.N
                }
                else{
                    snake_left=Direction.S
                }
                const left_dir = relativeDirection(facing, snake_left)
                switch (left_dir){
                    case 0:
                        setSnakeLeft(maze_snake["left"]["body"]["turn"][nextRoomLightLevel])
                        break;
                    case 1:
                        snakeTurned = true
                        if(nextRoom.getWall(snake_left) === wall_types.gate){
                            setSnakeLeft(maze_snake["left"]["body"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeLeft(maze_snake["left"]["body"]["normal"][nextRoomLightLevel])
                        }
                        break;
                    case 2:
                        setSnakeLeft(empty)
                        break;
                    case 3:
                        if(nextRoom.getWall(snake_left) === wall_types.gate){
                            setSnakeLeft(maze_snake["left"]["body"]["door"][nextRoomLightLevel])
                        }
                        else{
                            setSnakeLeft(maze_snake["left"]["body"]["normal"][nextRoomLightLevel])
                        }
                        break;
                }
                if (snakeTurned) {
                    setSnakeStyle(hitbox_dictionary[visible_snake]["turned"])
                }
                else{
                    setSnakeStyle(hitbox_dictionary[visible_snake]["normal"])
                }
            }
        }
        else{
            setSnakeLeft(empty)
            setSnakeRight(empty)
        }
    },[currentRoom, facing])

    const updateRoom = useCallback(() => {
        const set_current_room_torch = () =>{
            if(currentRoom.torch !== null){
                const torch = currentRoom.torch
                setTorchDirection(true)
                const dir = relativeDirection(facing, torch.orientation)
                switch(dir){
                    case 0:
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["front"])
                        break;
                    case 1:
                        setTorchDirection(false)
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
                        break;
                    case 2:
                        setTorchSrc(empty)
                        break;
                    case 3:
                        setTorchSrc(maze_dictionary["torch"][torch.lit]["side"])
                        break;
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
                    const dir = relativeDirection(facing, torch.orientation)
                    switch(dir){
                        case 0:
                            setFrontTorch(maze_dictionary["torch"][torch.lit]["front"])
                            break;
                        case 1:
                            setFrontTorchDirection(false)
                            setFrontTorch(maze_dictionary["torch"][torch.lit]["side"])
                            break;
                        case 2:
                            setFrontTorch(empty)
                            break;
                        case 3:
                            setFrontTorch(maze_dictionary["torch"][torch.lit]["side"])
                            break;
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
                    const dir = relativeDirection(facing, item.orientation)
                    if(item.interactable === Interactable_types.chest &&
                        sessionStorage.getItem("chest"+next_room.index_number) == "open"){
                        switch(dir){
                            case 0:
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["front_open"])
                                break;
                            case 1:
                                setFrontItemLeft(false)
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side_open"])
                                break;
                            case 2:
                                setFrontItemSrc(empty)
                                break;
                            case 3:
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side_open"])
                                break;
                        }
                    }
                    else{
                        switch(dir){
                            case 0:
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["front"])
                                break;
                            case 1:
                                setFrontItemLeft(false)
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side"])
                                break;
                            case 2:
                                setFrontItemSrc(empty)
                                break;
                            case 3:
                                setFrontItemSrc(maze_dictionary[item.interactable][nextRoomLightLevel]["side"])
                                break;
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
                    const left_room = get_next_room(left_wall_direction,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(left_room)
                    const leftBackWall = left_room.getWall(facing)
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
                    const right_room = get_next_room(right_wall_direction,currentRoom.index_number)
                    const nextRoomLightLevel = get_light_level(right_room)
                    const rightBackWall = right_room.getWall(facing)
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
                    const nextRoom = get_next_room(facing,currentRoom.index_number)
                    setNextRoom(nextRoom)
                    const nextRoomLightLevel = get_light_level(nextRoom)
                    setNextRoomLightLevel(nextRoomLightLevel)
                    setWallFrontSrc(maze_wall_dictionary[nextRoom.getWall(facing)][nextRoomLightLevel]["front"])
                    if(wall === wall_types.hall){
                        const leftFrontWall = nextRoom.getWall(left_wall_direction)
                        setLeftFrontWallSrc(maze_wall_dictionary[leftFrontWall][nextRoomLightLevel]["side"])
                        if(leftFrontWall === wall_types.hall || leftFrontWall === wall_types.gate){
                            const leftSideRoom = get_next_room(left_wall_direction,nextRoom.index_number)
                            const leftSideRoomLightLevel = get_light_level(leftSideRoom)
                            setLeftFrontSideWallSrc(maze_wall_dictionary[leftSideRoom.getWall(facing)][leftSideRoomLightLevel]["front"])
                            setLeftFrontSideWallCeilingSrc(maze_wall_dictionary[leftSideRoom.getWall(facing)][leftSideRoomLightLevel]["ceiling_front"])
                        }
                        else{
                            setLeftFrontSideWallSrc(empty)
                            setLeftFrontSideWallCeilingSrc(empty)
                        }
                        const rightFrontWall = nextRoom.getWall(right_wall_direction)
                        setRightFrontWallSrc(maze_wall_dictionary[rightFrontWall][nextRoomLightLevel]["side"])
                        if(rightFrontWall === wall_types.hall || rightFrontWall === wall_types.gate){
                            const rightNextRoom = get_next_room(right_wall_direction,nextRoom.index_number)
                            const rightNextRoomLightLevel = get_light_level(rightNextRoom)
                            setRightFrontSideWallSrc(maze_wall_dictionary[rightNextRoom.getWall(facing)][rightNextRoomLightLevel]["front"])
                            setRightFrontSideWallCeilingSrc(maze_wall_dictionary[rightNextRoom.getWall(facing)][rightNextRoomLightLevel]["ceiling_front"])
                        }
                        else{
                            setRightFrontSideWallSrc(empty)
                            setRightFrontSideWallCeilingSrc(empty)
                        }
                        if(!nextRoom.Ceiling || !currentRoom.Ceiling){
                            setLeftFrontCeilingSrc(maze_wall_dictionary[nextRoom.getWall(left_wall_direction)][nextRoomLightLevel]["ceiling_side"])
                            setRightFrontCeilingSrc(maze_wall_dictionary[nextRoom.getWall(right_wall_direction)][nextRoomLightLevel]["ceiling_side"])
                            setWallFrontCeilingSrc(maze_wall_dictionary[nextRoom.getWall(facing)][nextRoomLightLevel]["ceiling_front"])
                        }
                        else if(leftFrontCeilingSrc !== empty || rightFrontCeilingSrc !== empty){
                            setLeftFrontCeilingSrc(empty)
                            setRightFrontCeilingSrc(empty)
                            setWallFrontCeilingSrc(empty)
                        }
                    }
                    set_next_room_torch(nextRoom,nextRoomLightLevel)
                    set_next_room_item(nextRoom,nextRoomLightLevel)
                    renderSnake(snakeBody, nextRoom)
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
                    setSnakeLeft(empty)
                    setSnakeRight(empty)
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
    }, [X, Y, currentRoom, currentRoomLightLevel, facing, leftFrontCeilingSrc, renderSnake, rightFrontCeilingSrc, set_current_room_item, snakeBody, wallFrontSrc])

    const updateSnake = useCallback(() => {

        const move_player = (snake_direction:Direction) => {
            let direction:Direction
            switch(snake_direction){
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
            let wall = currentRoom.getWall(direction)
            if(wall !== wall_types.gate && wall !== wall_types.hall){
                switch(snake_direction){
                    case Direction.N:
                        direction = Direction.W
                        break;
                    case Direction.E:
                        direction = Direction.N
                        break;
                    case Direction.S:
                        direction = Direction.E
                        break;
                    case Direction.W:
                        direction = Direction.S
                        break;
                }
            }
            wall = currentRoom.getWall(direction)
            if(wall !== wall_types.gate && wall !== wall_types.hall){
                switch(snake_direction){
                    case Direction.N:
                        direction = Direction.E
                        break;
                    case Direction.E:
                        direction = Direction.S
                        break;
                    case Direction.S:
                        direction = Direction.W
                        break;
                    case Direction.W:
                        direction = Direction.N
                        break;
                }
            }
            navigate_player(direction)
        }
        
        const snake_path:number[] = [41,40,39,38,31,30,23,16,17,18,19,20,27,34]
        let snake_body: number[]
        if(snakeBody.length === 0){

            const snake_body_raw = sessionStorage.getItem("snake")
            snake_body = snake_body_raw ? JSON.parse(snake_body_raw) : [];
        }
        else{
            snake_body = snakeBody
        }
        if (snake_body.length === 0 || snake_body.includes(Number('null')))
        {
            for (let i=0;i<6;i++){
                snake_body.push(snake_path[i])
            }
        }
        else
        {
            for (let i=0;i<6;i++){
                const s = snake_path.indexOf(snake_body[i])
                if(s-1 > snake_path.length){
                    snake_body[i] = snake_path[s-snake_path.length]
                }
                else if(s === 0){
                    snake_body[i] = snake_path[snake_path.length-1]
                }
                else{
                    snake_body[i] = snake_path[s-1]
                }
            }
        }
        sessionStorage.setItem("snake", JSON.stringify(snake_body))
        setSnakeBody(snake_body)
        if(snake_body.includes(currentRoom.index_number)){
            let snake_direction:Direction
            if(snake_body[1] === currentRoom.index_number+1){
                snake_direction = Direction.E
            }
            else if(snake_body[1] === currentRoom.index_number-7){
                snake_direction = Direction.S
            }
            else if(snake_body[1] === currentRoom.index_number-1){
                snake_direction = Direction.W
            }
            else{
                snake_direction = Direction.N
            }
            move_player(snake_direction)
        }
        renderSnake(snake_body, nextRoom)
    }, [currentRoom, navigate_player, nextRoom, renderSnake, snakeBody])

    useEffect(() => {
        const interval = setInterval(() => {
            updateSnake();
        }, 2000);

        return () => clearInterval(interval);
    }, [updateSnake]);

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
        const inventory_remove_item = (item:item)=> {
            setInventory(inventory.splice(inventory.indexOf(item)))
            sessionStorage.setItem("items", JSON.stringify(inventory))
        }
        
        const clickHandler = () => {
            const wall = currentRoom.getWall(facing)
            if (wall === wall_types.door1 && heldItem === item.key1){
                sessionStorage.setItem("door1","open")
                inventory_remove_item(heldItem)
                setHeldItem(null)
                maze_layout[43].E_wall = wall_types.gate
                maze_layout[44].W_Wall = wall_types.gate
                updateRoom()
            }
            else if (wall === wall_types.door2 && heldItem === item.key2){
                sessionStorage.setItem("door2","open")
                inventory_remove_item(heldItem)
                setHeldItem(null)
                maze_layout[22].E_wall = wall_types.gate
                maze_layout[23].W_Wall = wall_types.gate
                updateRoom()
            }
            else if (wall === wall_types.door3 && heldItem === item.key3){
                sessionStorage.setItem("door3","open")
                inventory_remove_item(heldItem)
                setHeldItem(null)
                maze_layout[24].E_wall = wall_types.gate
                maze_layout[25].W_Wall = wall_types.gate
                updateRoom()
            }
            else if (heldItem === item.matches && currentRoom.torch?.lit === torch_state.off) {
                let litTorchCount:number | null
                const count = sessionStorage.getItem("litTorches")
                if(count === null) {
                    litTorchCount = 1
                    sessionStorage.setItem("litTorches", "1")
                }
                else{
                    litTorchCount = +count
                    sessionStorage.setItem("litTorches", String(litTorchCount += 1))
                }
                sessionStorage.setItem("torch"+litTorchCount,currentRoom.index_number.toString())
                setHeldItem(null)
                const torch = maze_layout[currentRoom.index_number].torch;
                if (torch != null) {
                    torch.lit = torch_state.on;
                }
                updateRoom()
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

        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("mousedown", clickHandler);
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
            window.removeEventListener("mousedown", clickHandler);
        }
    }, [currentRoom, facing, heldItem, inventory, inventoryOpen, move, turn, updateRoom]);
    
    useEffect(() => {
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
            const count = sessionStorage.getItem("litTorches")
            const litTorches = count !== null ? +count : 0
            for(let i = litTorches; i > 0; i--){
                const roomNumber = sessionStorage.getItem("torch"+i)
                if (roomNumber !== null){
                    const torch = maze_layout[+roomNumber].torch;
                    if (torch != null) {
                        torch.lit = torch_state.on;
                    }
                }
            }
        }
        
        initGameData()
        updateSnake()
        updateRoom()
    }, []);

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
                    <img id="snake_left" className="snake_left" src={snakeLeft} alt="snake not found" style={snakeStyle}/>
                    <img id="snake_right" className="snake_right" src={snakeRight} alt="snake not found" style={snakeStyle}/>
                    <img id="item" className="item" src={itemSrc} alt="item not found" style={{
                        transform: `${itemLeft ? '' : 'scaleX(-1)'}`
                    }}/>
                    <button id="item_trigger" disabled={itemSrc === empty} className="item_trigger" style={{
                        ...itemHitbox,
                        right: !itemLeft ? `${itemHitbox.left}` : "",
                        left: itemLeft ? `${itemHitbox.left}` : "",
                        zIndex: itemHitbox != null && heldItem == null ? "51" : "0",
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
                                    <button className="inventory_slot_trigger" onClick={() => inventory_hold_item(item)}
                                            disabled={heldItem !== null}/>
                                    <img className="inventory_slot_icon" src={maze_item_dictionary[item]} alt="item"/>
                                </li>
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
                        <img id="map" className="map" alt="map_binder"
                             src={sessionStorage.getItem("map") === "true" ? backpack_map : empty}/>
                        <img id="compass" className="compass" alt="compass_hanger"
                             src={sessionStorage.getItem("compass") === "true" ? backpack_compass : empty}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Maze