import React, {useState} from "react";

const Game_player: React.FC = () => {

    const [playing, setPlaying] = useState(false)

    function loadIframe() {
        setPlaying(true)
        const container = document.getElementsByClassName('game_player')[0];
        if (!container) return;

        // Remove existing iframe if present
        const existing = container.querySelector('iframe');
        if (existing) existing.remove();

        // Create new iframe
        const iframe = document.createElement('iframe');
        iframe.src = "/nyctophobia/index.html";
        container.appendChild(iframe);
    }

    function unloadIframe() {
        setPlaying(false)
        const container = document.getElementsByClassName('game_player')[0];
        if (!container) return;
        const iframe = container.querySelector('iframe');
        if (iframe) iframe.remove();
    }

    return(
            <div className="game_player">
                <iframe src="/nyctophobia/index.html" style={{
                    display: !playing ? 'none' : 'block',
                }}></iframe>
                <button onClick={() => !playing ? loadIframe() : unloadIframe()} style={{
                    position: 'relative',
                    left: playing ? '0' : 'calc(50% - 25px)',
                    top: playing ? '0' : 'calc(50% - 25px)',
                    display: 'block',
                    width: '50px',
                    height: '50px',
                }}>
                    <img src={!playing ? '/play-circle.svg': '/cross.svg'} alt="play button"/>
                </button>
            </div>
    );
}

export default Game_player;