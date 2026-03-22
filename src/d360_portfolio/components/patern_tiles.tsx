import React, {useState, useRef, type ReactNode} from 'react';
import tile_text from "../text/tile_text.json"

const Tile_set: React.FC = ():ReactNode => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const isOpen = useRef<boolean[]>([]);
    const [tiles, setTiles] = useState<string[]>(["src/d360_portfolio/assets/tile_1_empty.jpg",
        "src/d360_portfolio/assets/tiles/tile_2_empty.jpg","src/d360_portfolio/assets/tiles/tile_3_empty.jpg","src/d360_portfolio/assets/tiles/tile_4_empty.jpg",
        "src/d360_portfolio/assets/tiles/tile_5_empty.jpg","src/d360_portfolio/assets/tiles/tile_6_empty.jpg","src/d360_portfolio/assets/tiles/tile_7_empty.jpg",
        "src/d360_portfolio/assets/tiles/tile_8_empty.jpg","src/d360_portfolio/assets/tiles/tile_9_empty.jpg","src/d360_portfolio/assets/tiles/tile_10_empty.jpg",
        "src/d360_portfolio/assets/tiles/tile_11_empty.jpg","src/d360_portfolio/assets/tiles/tile_12_empty.jpg","src/d360_portfolio/assets/tiles/tile_13_empty.jpg",
        "src/d360_portfolio/assets/tiles/tile_14_empty.jpg","src/d360_portfolio/assets/tiles/tile_15_empty.jpg","src/d360_portfolio/assets/tiles/tile_16_empty.jpg",]);

    const tileRefs = useRef<(HTMLImageElement | null)[]>([]);
    const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

    const open = async () => {
        if (!loaded){
            setLoaded(true);
            let pencilFilledIn: boolean = false
            for (let tile = 0; tile < 17; tile++) {
                if (pencilFilledIn) {
                    fade_in(tile)
                    await new Promise(f => setTimeout(f, 100));
                }
                else {
                    fade_out(tile)
                    await new Promise(f => setTimeout(f, 100));
                    if (tile == 16) {
                        setTiles(["src/d360_portfolio/assets/tiles/tile_1_coloured.jpg","src/d360_portfolio/assets/tiles/tile_2_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_3_coloured.jpg","src/d360_portfolio/assets/tiles/tile_4_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_5_coloured.jpg","src/d360_portfolio/assets/tiles/tile_6_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_7_coloured.jpg","src/d360_portfolio/assets/tiles/tile_8_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_9_coloured.jpg","src/d360_portfolio/assets/tiles/tile_10_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_11_coloured.jpg","src/d360_portfolio/assets/tiles/tile_12_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_13_coloured.jpg","src/d360_portfolio/assets/tiles/tile_14_coloured.jpg",
                            "src/d360_portfolio/assets/tiles/tile_15_coloured.jpg","src/d360_portfolio/assets/tiles/tile_16_coloured.jpg"])
                        tile = 0
                        pencilFilledIn = true
                    }
                }
            }
            finish()
        }
    };

    const fade_in = (id: number) => {
        const tile = tileRefs.current[id-1];
        if (!tile) return;

        tile.style.transition = "opacity 0.5s ease";
        tile.style.opacity = "1";

        tile.className = "tile"
    };

    const fade_out = (id: number) => {
        const tile = tileRefs.current[id-1];
        if (!tile) return;

        tile.style.transition = "opacity 0.5s ease";
        tile.style.opacity = "0";
    };

    const finish = () => {
        for (let i = 0; i < 17; i++){
            const tile = tileRefs.current[i];
            if (!tile) return;

            tile.style.transition = "";
            tile.className = "tile"
        }
    }

    const load_card = (index: number) => {
        const info = infoRefs.current[index];
        if (!info) return;

        isOpen.current[index] = true;

        info.style.paddingLeft = "30%";
        info.style.zIndex = "2";
    };

    const unload_card = (index: number) => {
        const info = infoRefs.current[index];
        if (!info) return;

        isOpen.current[index] = false;

        const handleTransitionEnd = (e: TransitionEvent) => {
            if (e.propertyName === "padding-left" && !isOpen.current[index]) {
                info.style.zIndex = "-1";
                info.removeEventListener("transitionend", handleTransitionEnd);
            }
        };

        info.addEventListener("transitionend", handleTransitionEnd);

        info.style.paddingLeft = "0";
    };

    return (
        <>
            <div className="tile_set" onLoad={() => open()}>
                {tiles.map((tile, i) => (
                    <div style={{display:"flex"}}><img
                        key={i}
                        ref={(el) => {
                            tileRefs.current[i] = el;
                        }}
                        alt={`tile_${i}`}
                        src={tile}
                        onClick={() => load_card(i)}
                        onMouseLeave={() => unload_card(i)}
                    />
                        <div className="information_card"
                             ref={(el) => {
                                 infoRefs.current[i] = el;
                             }}>
                            <b>Vorm: </b>{tile_text[i]["Vorm"]}<b> Kleur: </b>{tile_text[i]["Kleur"]}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

};

export default Tile_set;