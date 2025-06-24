import Footer from "../components/footer";
import TextField from "../components/text_field.tsx";
import Background from "../components/Background.tsx";
import Dropdown from "../components/link_dropbox.tsx";
import '../styling/App.css'
import '../styling/TextField.css'
import '../styling/Footer.css'
import '../styling/Content.css'
import '../styling/Showreel.css'
import '../styling/Drowpdown.css'
import React from "react";

const App: React.FC = () => {
    return (
        <>
            <Background/>
            <TextField/>
            <Dropdown></Dropdown>
            <Footer/>
        </>
);
};

export default App