import Project_space from "../components/project_space.tsx";
import Tile_set from "../components/patern_tiles.tsx";
import '../styling/project_space.css';
import '../styling/Top_bar.css';
import '../styling/patern_tiles.css';
import React from "react";

const Personal_expedition:React.FC = () => {

    return(<>
        <Project_space title={"Dubbel portret"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/dubbel_portret.jpeg"}]}>
        </Project_space>
        <Project_space title="Nulmeting"
        images ={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/interventie_1.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/interventie_2.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/interventie_3.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/interventie_4.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/interventie_5.jpeg"}]}>
        </Project_space>
        <Project_space title={"Excursie Fenix, Brutus, Photo museum"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/museum_1.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/museum_2.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/museum_3.jpeg"}
        ]}></Project_space>
        <Project_space title="Compositie en patronen"
        images ={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/patronen_vel_1.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/patronen_vel_2.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/patronen_experiment_1.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/patronen_experiment_2.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/Patronen_mok.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/Pattern_tile_inspiration.jpeg"},
            {type: "image",content:"src/d360_portfolio/assets/personal_expedition/pattern_tile_onderzoek.jpeg"},
            {type: "component",component:() => (<Tile_set/>)}]}>
        </Project_space>
        <Project_space title={"Experiment"}
        images={[{type: "video",content: "src/d360_portfolio/assets/D360Experimentation_small_paper.mp4"},
            {type: "video",content: "src/d360_portfolio/assets/D360Experimentation_big_paper.mp4"}]}>
        </Project_space>
        <Project_space title={"Accidental art"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/accidental_art_1.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/accidental_art_2.jpeg"}]}>
        </Project_space>
        <Project_space title={"Spirit dier"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/spirit_animal_voeten.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/spirit_animal_benen.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/spirit_animal_nek.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/spirit_animal_hoofd.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/spirit_dier.jpeg"}]}>
        </Project_space>
        <Project_space title="Bare bones"
        images={[{type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_1.jpeg"},
            {type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_2.jpeg"},
            {type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_3.jpeg"},
            {type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_4.jpeg"},
            {type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_5.jpeg"},
            {type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_line_1.jpeg"},
            {type : "image", content : "src/d360_portfolio/assets/personal_expedition/Skull_line_2.jpeg"},]}>
        </Project_space>
        <Project_space title={"Capturing Sunshine"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_1.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_2.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_3.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_4.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_5.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_6.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_7.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/houtskool_8.jpeg"}]}>
        </Project_space>
        <Project_space title={"Create mixed media"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/mixed_media.jpeg"},
            {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Mixed_media_poster.png"}
        ]}>
        </Project_space>
        <Project_space title={"Excursie Rijks museum, Stedelijk museum"}
        images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/feeling_blue.jpeg"},]}>
        </Project_space>
        <Project_space title={"Hide and seek vorm en emotie"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/Masker_prototype_1.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Masker_1.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Masker_2.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Masker_manga_potloot.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Masker_manga.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Masker_3.jpeg"}
                       ]}>
        </Project_space>
        <Project_space title={"Create treehouse"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/Boomhut_1.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Boomhut_2.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Boomhut_3.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Boomhut_4.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Boomhut_4_open.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Treehouse_background.jpg"}]}>
        </Project_space>
        <Project_space title={"Cardboard curiosities"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/Karton_vormgeving_1.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Karton_vormgeving_2.jpeg"}]}>
        </Project_space>
        <Project_space title={"Speurtocht Tilburg"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/Ikigai.jpeg"},]}>
        </Project_space>
        <Project_space title={"zintuigen werken - podcast"}
                       images={[{type: "audio",content: "src/d360_portfolio/assets/personal_expedition/Sky_design.mpeg"},]}>
        </Project_space>
        <Project_space title={"Long story short"}
                       images={[
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/15_zinnen.jpeg"},
                           {
                           type: "component",component: () => (
                               <Project_space
                                   images={[{ type: "image", content: "src/d360_portfolio/assets/personal_expedition/Long_story_short/Werd_geboren.jpeg" }]}
                                   title={"Werd geboren in Maximiliana ziekenhuis"}/>)},
                           {type: "component",component: () => (
                               <Project_space
                                   images={[{type: "video",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Groeide_op_in_laagveld.mp4"}]}
                                   title={"Groeide op in Laagveld"}/>)},
                           {type: "component",component: () => (
                               <Project_space
                                   images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Ging_naar_de_basisschool.png"}]}
                                   title={"Begon met de basisschool"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/ontmoete_beste_vriend_in_kleuterklas.jpeg"}]}
                                       title={"Ontmoete beste vriend in kleuterklas"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Bleef_zitten_in_groep_3.jpeg"}]}
                                       title={"Blijf zitten in 3e klas"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/kreeg_dyslexie_verklaring.jpeg"}]}
                                       title={"Dyslexie diagnose"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/ging_naar_vanmearlant.png"}]}
                                       title={"Ga naar Vanmaerlantlyceum middelbare school"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Maakte_nieuwe_vrienden_groep.png"}]}
                                       title={"Maak nieuwe vrienden groep"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Had_moeite_met_frans_en_duits.jpeg"}]}
                                       title={"Frans en Duits moeilijk"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Ging_naar_havo_open.jpeg"},
                                           {type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Ging_naar_havo_dicht.jpeg"}]}
                                       title={"Ga van VWO naar HAVO"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Maakte_video_game_als_eindproject.jpg"}]}
                                       title={"Maak videogame voor eindproject"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Ging_naar_fontys_met_vriend.jpeg"}]}
                                       title={"Naar Fontys met beste vriend"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Semester_game_design.gif"}]}
                                       title={"Doe een semester game design"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/cude_destruction.gif"}]}
                                       title={"Stage in eigen bedrijf gefaald"}/>)},
                           {type: "component",component: () => (
                                   <Project_space
                                       images={[{type: "image",content:"src/d360_portfolio/assets/personal_expedition/Long_story_short/Ging_naar_design_360.jpeg"}]}
                                       title={"Minor design 360"}/>)}
                       ]}>
        </Project_space>
        <Project_space title={"Illustratie storytelling"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/Aquarel_test.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Rood_kapje_1.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Rood_kapje_2.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Rood_kapje_3.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Aquarel_eindwerk.jpeg"},]}>
        </Project_space>
        <Project_space title={"fotografie"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/foto_experiment_1.JPG"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/foto_experiment_2.JPG"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/foto_experiment_3.JPG"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/foto_experiment_4.JPG"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/foto_experiment_5.JPG"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/fotograpje.jpeg"},]}>
        </Project_space>
        <Project_space title={"Reflectie"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/Reflectie_modellen.jpeg"},
                           {type: "image",content: "src/d360_portfolio/assets/personal_expedition/Reflectie_interview.jpeg"}
                       ]}>
        </Project_space>
        <Project_space title={"Fantastic plastic"}
                       images={[{type: "image",content: "src/d360_portfolio/assets/personal_expedition/piranha_plant_wax.jpeg"},]}>
        </Project_space>
    </>)
}

export default Personal_expedition;