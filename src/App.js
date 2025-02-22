import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeamPlanner from "./components/TeamPlanner";
import CompositionList from "./components/CompositionList";
import CompositionDetail from "./components/CompositionDetail";
import EditComposition from "./components/EditComposition";
import "./App.css";

function App() {
  return (
    <Router>
      <header className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-link">
            Team Planner
          </Link>
          <Link to="/compositions" className="nav-link">
            Saved Compositions
          </Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TeamPlanner />} />
          <Route path="/compositions" element={<CompositionList />} />
          <Route path="/composition/:id" element={<CompositionDetail />} />
          <Route path="/edit-composition/:id" element={<EditComposition />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
