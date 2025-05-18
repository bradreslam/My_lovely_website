import React, { useState, useRef } from "react";

interface GamePlayerProps {
    gameName: string;
}

const Game_player: React.FC<GamePlayerProps> = ({ gameName }) => {
    const [playing, setPlaying] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function loadIframe() {
        setPlaying(true);
        const container = containerRef.current;
        if (!container) return;

        // Remove existing iframe if present
        const existing = container.querySelector('iframe');
        if (existing) existing.remove();

        // Create new iframe
        const iframe = document.createElement('iframe');
        iframe.src = `/${gameName}/index.html`;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        container.appendChild(iframe);
    }

    function unloadIframe() {
        setPlaying(false);
        const container = containerRef.current;
        if (!container) return;
        const iframe = container.querySelector('iframe');
        if (iframe) iframe.remove();
    }

    return (
        <div
            className="game_player"
            ref={containerRef}
            style={{
                position: fullScreen ? 'fixed' : 'relative',
                zIndex: fullScreen ? 100 : 5,
                width: fullScreen ? '100vw' : 'auto',
                height: fullScreen ? '100vh' : 'auto',
                top: fullScreen ? 0 : 'auto',
                left: fullScreen ? 0 : 'auto',
            }}
        >
            <button
                onClick={() => !playing ? loadIframe() : unloadIframe()}
                style={{
                    left: playing ? '0' : 'calc(50% - 35px)',
                    bottom: playing ? '0' : 'calc(50% - 35px)',
                    zIndex: fullScreen ? 100 : 7,
                    position: "absolute"
                }}
            >
                <img src={!playing ? '/play_icon.svg' : '/cross.svg'} alt="play button" />
            </button>
            <button
                onClick={() => setFullScreen(!fullScreen)}
                style={{
                    right: '0',
                    bottom: '0',
                    zIndex: fullScreen ? 100 : 7,
                    position: "absolute"
                }}
            >
                <img src={!fullScreen ? '/full_screen_icon.svg' : '/exit_full_screen_icon.svg'} alt='full screen button' />
            </button>
        </div>
    );
};

export default Game_player;