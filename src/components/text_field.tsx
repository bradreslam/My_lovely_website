import React from 'react';
import Showreel from './Image_showreel.tsx';

const TextField: React.FC = () => {
    return (
        <div className="text_field_container">
            <div className="text_field_left"></div>
            <div className="text_field_top_container">
                <div className="text_field_left_corner"></div>
                <div className="text_field_top"></div>
                <div className="text_field_right_corner"></div>
            </div>
            <div className="text_field">
                <div className="introduction">
                    <img className="profile" alt="portrait"/>
                    <p>Hello my name is Bram, and I am an ict student at Fontys interested in game design.</p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                    <video controls playsInline={true}>
                        <source src="/codect_showcase.mp4" type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                    <p>This project is called Codect, and served as a small game.
                        In this game you can create your own electrical components, and place them on a grid.
                        It was made using react, typescript, and C#.</p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                    <Showreel></Showreel>
                    <p>I put some drawings I made in this slider, so you can have a look at my art style.</p>
                </div>
            </div>
            <div className="text_field_right"></div>
        </div>
    );
};

export default TextField;