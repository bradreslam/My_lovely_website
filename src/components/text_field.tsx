import React from 'react';

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
            </div>
            <div className="text_field_right"></div>
        </div>
    );
};

export default TextField;