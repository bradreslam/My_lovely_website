import Footer from "./components/footer";
import TextField from "./components/text_field.tsx";
import Background from "./components/Background.tsx";
import './styling/App.css'
import './styling/TextField.css'
import './styling/Footer.css'
import './styling/Content.css'
import './styling/Showreel.css'
import React from "react";

const App: React.FC = () => {
  return (
    <>
        <Background/>
        <TextField/>
        <Footer/>
    </>
  );
};

export default App
