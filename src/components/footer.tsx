import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const [doorPosition, setDoorPosition] = useState(0)
    const [clickCount, setClickCount] = useState(0);
    const [doorOpen, setDoorOpen] = useState(false);

    useEffect(() => {
        setDoorPosition(Math.random())
    }, []);

    const handleClick = () => {
        if(doorOpen){
            navigate('/maze/1/2');
        }
        if(clickCount < 4){
            setClickCount(clickCount+1)
            console.log(clickCount)
        }
        else{
            setDoorOpen(true);
        }
    };

    return (
        <div className="footer">
            <div className="left_tower"/>
            <div className="right_tower"/>
            <button className="maze_door" onClick={handleClick} style={{right: `${doorPosition * (90 - 10) + 10}%`}}>
                <image className="maze_door_block" style={{ transform: doorOpen? `translateY(65px)`: 'none',
                    transition: 'transform 1s ease'}}/>
            </button>
        </div>
    );
};

export default Footer;