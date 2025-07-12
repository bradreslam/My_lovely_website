import {useNavigate} from "react-router-dom";
import React from 'react';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/maze/1/2');
    };

    return (
        <div className="footer">
            <div className="left_tower"/>
            <div className="right_tower"/>
            <button className="maze_door" onClick={handleClick} style={{right: `${Math.random() * (95 - 5) + 5}%`}}/>
        </div>
    );
};

export default Footer;