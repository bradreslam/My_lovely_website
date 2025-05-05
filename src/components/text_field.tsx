import React from 'react';
import Showreel from './Image_showreel.tsx';
import Game_player from './Game_player';

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
                    <p>Hello my name is Bram. I am a software development student from
                        <a href="https://www.fontys.nl/Studeren/Opleidingen/HBO-ICT.htm" target="_blank"> Fontys</a> in the Netherlands.
                       My goal is to become an solo indie game developer.
                    </p>
                    <p>
                        <br/><b>Experience:</b><br/>&#9679; Writing in C#, Python, Html, Typescript, and css<br/>
                        &#9679; Using Godot <br/>
                        &#9679; Using git<br/>
                        &#9679; Working in a team environment<br/>
                        &#9679; Working with Agile and Scrum<br/>
                        &#9679; Making 2d sprites and animations
                    </p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                    <video controls playsInline={true} poster="/Codect_thumbnail.png">
                        <source src="/codect_showcase.mp4" type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                    <p>This project is called Codect, and served as a small game.
                        In this game you can create your own electrical components, and place them on a grid.
                        It was made using react, typescript, and C#.
                        It is still a small prototype, and has quite a lot of lag.</p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                    <Game_player></Game_player>
                    <p>This is a small platformer game I made with a partner,
                        its called nyctophobia which means fear of the dark.
                        The original scope of the game was a lot bigger than this,
                        it included more levels and a monster that would chase you around.
                        However because of time constraints we had to scrap those ideas.
                        I mainly worked on the player movement, player animations, all the sounds and the
                        background.</p>
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