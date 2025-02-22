import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CompositionSaver from "./CompositionSaver";
import "./CompositionList.css";

function CompositionList() {
  const [compositions, setCompositions] = useState([]);
  const compRefs = useRef({}); // Her kompozisyon için ayrı bir ref saklayacak obje

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compositions")) || [];
    setCompositions(saved);
  }, []);

  const handleDelete = (id) => {
    const filtered = compositions.filter((comp) => comp.id !== id);
    setCompositions(filtered);
    localStorage.setItem("compositions", JSON.stringify(filtered));
  };

  return (
    <div className="composition-list">
      <h1>Saved Compositions</h1>
      {compositions.length === 0 ? (
        <p>No compositions saved.</p>
      ) : (
        <ul>
          {compositions.map((comp) => {
            // Ref'lerin atanmasını garanti etmek için
            if (!compRefs.current[comp.id]) {
              compRefs.current[comp.id] = React.createRef();
            }

            return (
              <li key={comp.id} className="composition-item" ref={compRefs.current[comp.id]}>
                <Link to={`/composition/${comp.id}`}>{comp.name}</Link> -{" "}
                {new Date(comp.date).toLocaleString()}
                {/* Silme butonu */}
                <button onClick={() => handleDelete(comp.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CompositionList;
