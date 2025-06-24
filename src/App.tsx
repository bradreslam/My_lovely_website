import HomePage from "./pages/HomePage.tsx";
import Maze from "./pages/Maze.tsx";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/maze" element={<Maze />} /> {/* 👈 New route */}
        </Routes>
    </Router>
  );
};

export default App
