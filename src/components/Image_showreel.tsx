import React, { useState } from 'react';
import DrawingPart1 from '/DrawingPart1.jpg';
import DrawingPart2 from '/DrawingPart2.jpg';
import DrawingPart3 from '/DrawingPart3.jpg';
import DrawingPart4 from '/DrawingPart4.jpg';
import DrawingPart5 from '/DrawingPart5.jpg';
import SpaceSub from '/SpaceSub.jpg';
import HeartSchematic from '/HeartSchematic.jpg';
import MysteryLandscape from '/MysteryLandscape.jpg';

// Example image sources (replace with your actual image paths)
const images = [DrawingPart1, DrawingPart2, DrawingPart3, DrawingPart4, DrawingPart5,
    SpaceSub, HeartSchematic, MysteryLandscape];

const Showreel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const showNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="showreel">
            <button type="button" onClick={showPrev} className="prev_button">
                <i>Prev</i>
            </button>
            <img
                alt="image couldn't be loaded"
                src={images[currentIndex]}
            />
            <button type="button" onClick={showNext} className="next_button">
                <i>Next</i>
            </button>
        </div>
    );
};

export default Showreel;