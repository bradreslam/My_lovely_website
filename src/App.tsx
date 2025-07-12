import HomePage from "./pages/HomePage.tsx";
import Maze from "./pages/Maze.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/maze/:X/:Y" element={<Maze />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
  );
};

export default App
