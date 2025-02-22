import React, { useState } from "react";
import BuildCreator from "./BuildCreator";
import BuildCard from "./BuildCard";
import "./TeamPlanner.css";

function TeamPlanner() {
    const [builds, setBuilds] = useState([]);
    const [compositionName, setCompositionName] = useState("");
  
    const handleAddBuild = (newBuild) => {
      setBuilds([...builds, newBuild]);
    };
  
    const saveComposition = () => {
      if (!compositionName) {
        alert("Please enter a composition name");
        return;
      }
      const newComposition = {
        id: Date.now(),
        name: compositionName,
        builds: builds,
        date: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem("compositions")) || [];
      existing.push(newComposition);
      localStorage.setItem("compositions", JSON.stringify(existing));
      setBuilds([]);
      setCompositionName("");
      alert("Composition saved!");
    };
  
    return (
      <div className="team-planner">
        <BuildCreator onSaveBuild={handleAddBuild} />
        <div className="build-list">
          {builds.map((build, index) => (
            <BuildCard key={index} build={build} />
          ))}
        </div>
        {builds.length > 0 && (
          <div className="composition-save">
            <input
              type="text"
              placeholder="Composition Name"
              value={compositionName}
              onChange={(e) => setCompositionName(e.target.value)}
            />
            <button onClick={saveComposition}>Save Composition</button>
          </div>
        )}
      </div>
    );
  }
  
  export default TeamPlanner;
