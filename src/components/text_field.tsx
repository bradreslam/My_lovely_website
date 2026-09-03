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
                    <p>Hello my name is Bram. I am a 21 year old software\game development student from
                        <a href="https://www.fontys.nl/Studeren/Opleidingen/HBO-ICT.htm" target="_blank"> Fontys</a> in
                        the Netherlands.
                    </p>
                    <p>
                        <br/><b>Experience:</b><br/>&#9679; Writing in C#, Python, Html, Typescript, and gdscript<br/>
                        &#9679; Using Godot, and Unity <br/>
                        &#9679; Working with git<br/>
                        &#9679; Drawing and animating using Krita<br/>
                        &#9679; Editing audio using Audacity<br/>
                        &#9679; Working in a team environment<br/>
                        &#9679; Working with Agile and Scrum<br/>
                    </p>
                </div>
                <div className="line"/>

                <div className="project_segment">
                    <Game_player gameName="pallaleo"></Game_player>
                    <p>I made this small demo of a game named Pallaleo during my first internship.
                        The final game is supposed to be 3 chapters long with a slow buildup leading up to the end.
                        So a lot of the final plan isn't present in this demo,
                        but it still contains some gameplay that would have been part of the final game.<br/>
                        <b>Controls:</b><br/>
                        Movement: A/D or left/right<br/>
                        Jump: space or Z<br/>
                        Interact: W or up<br/>
                        Minigames can use the mouse<br/>
                        <a href="https://github.com/bradreslam/pallaleo">Github repository</a>
                    </p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                    <Game_player gameName="nyctophobia"></Game_player>
                    <p>This is a small platformer game I made with a partner,
                        its called nyctophobia which means fear of the dark.
                        The original scope of the game was a lot bigger than this,
                        it included more levels and a monster that would chase you around.
                        However because of time constraints we had to scrap those ideas.
                        I mainly worked on the player movement, player animations, all the sounds and the
                        background.<br/><b>Controls:</b><br/>
                        Movement: A\D or left\right<br/>
                        Jump\Climb: space or Z<br/>
                        Additional movement: Wall jump and ledge grab<br/>
                        <a href="https://github.com/Maurice438361/Nyctophobia-YOGduo">Github repository</a>
                    </p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                    <Game_player gameName="the_waiting_room"></Game_player>
                        <p>This is a game I made for a game jam in 4 days, the theme was "one room wonders".
                        Because of the short timeframe I didn't have time to add any instructions inside the game,
                            but I added a hint system later by clicking on the top right of the ceiling.<br/>
                        <b>Controls:</b><br/>clicking and draging with the mouse<br/>
                        <a href = "https://github.com/bradreslam/the-waiting-room">Github repository</a>
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
                        It is still a small prototype, and has quite a lot of lag. This is also my oldest project here.
                        <br/><a href="https://github.com/bradreslam/codect">Github repository</a>
                    </p>
                </div>
                <div className="line"/>
                <div className="project_segment">
                <Showreel></Showreel>
                    <p>I put some drawings I made in this carousel, so you can have a look at my art style.</p>
                </div>
            </div>
            <div className="text_field_right"></div>
        </div>
    );
};

export default TextField;