import Footer from "./components/footer";
import TextField from "./components/text_field.tsx";
import './App.css'
import './TextField.css'
import './Footer.css'
import './Content.css'
import React from "react";

const App: React.FC = () => {
  return (
    <>
        <TextField></TextField>
        <Footer ></Footer>
    </>
  );
};

export default App
