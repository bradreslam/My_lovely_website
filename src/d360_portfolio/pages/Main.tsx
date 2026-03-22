import Top_bar from "../components/Top_bar.tsx";
import Tile_set from "../components/patern_tiles.tsx";
import '../styling/patern_tiles.css';
import '../styling/Top_bar.css'
import React from "react";

const Main: React.FC = () => {
    return(
        <>
            <Top_bar/>
            <Tile_set></Tile_set>
        </>
    )
}

export default Main;