import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BuildCard from "./BuildCard";
import "./CompositionDetail.css";

function CompositionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [composition, setComposition] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compositions")) || [];
    const comp = saved.find((item) => item.id.toString() === id);
    setComposition(comp);
  }, [id]);

  if (!composition) {
    return <p>Composition not found.</p>;
  }

  // Build'leri 10'lu parçalara ayır
  const firstColumn = composition.builds.slice(0, 10);
  const secondColumn = composition.builds.slice(10);

  return (
    <div className="composition-detail">
      <div className="composition-header">
        <h1>{composition.name}</h1>
        <button
          className="edit-button"
          onClick={() => navigate(`/edit-composition/${id}`)}
        >
          Edit Composition
        </button>
      </div>
      <div className="composition-container">
        {/* İlk Sütun */}
        <div className="composition-column">
          {firstColumn.map((build, index) => (
            <BuildCard key={index} build={build} />
          ))}
        </div>

        {/* İkinci Sütun (10+ build varsa) */}
        {secondColumn.length > 0 && (
          <div className="composition-column">
            {secondColumn.map((build, index) => (
              <BuildCard key={index + 10} build={build} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompositionDetail;
