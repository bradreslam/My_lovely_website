import React from 'react';
import {useState} from "react";

const Dropdown: React.FC = () => {

    const [moved, setMoved] = useState(false);

    const links = [
        { distance: 140, label: "LinkedIn" },
        { distance: 70, label: "Github" }
    ];

    const addresses: { [key: string]: string } = {
        "LinkedIn":"https://www.linkedin.com/in/bram-alders-a5b939300/",
        "Github":"https://github.com/bradreslam"
    }

    function redirect(name:string) : void {
        window.open(
            addresses[name],
            '_blank'
        )
    }

    return (
        <div className="dropdown">
            <button className="dropdown_cover" onClick={() => setMoved(!moved)}>Dropdown</button>
            {links.map((link) => (
                <button
                    key={link.label}
                    className="dropdown_link"
                    style={{
                        transform: moved ? `translateY(${link.distance}px)` : 'none',
                        transition: 'transform 0.3s ease',
                    }}
                    onClick={() => redirect(link.label)}
                >
                    {link.label}
                    <img alt="icon" src={`/${link.label}.png`}/>
                </button>
            ))}
        </div>
    );
};
export default Dropdown;