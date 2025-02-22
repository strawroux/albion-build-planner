import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BuildCard from "./BuildCard";
import EditBuildModal from "./EditBuildModal";
import "./EditComposition.css";

function EditComposition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [composition, setComposition] = useState(null);
  const [name, setName] = useState("");
  const [builds, setBuilds] = useState([]);
  const [editingBuildIndex, setEditingBuildIndex] = useState(null);
  const [showEditBuildModal, setShowEditBuildModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compositions")) || [];
    const comp = saved.find((item) => item.id.toString() === id);
    if (comp) {
      setComposition(comp);
      setName(comp.name);
      setBuilds(comp.builds);
    }
  }, [id]);

  const handleDeleteBuild = (index) => {
    const newBuilds = [...builds];
    newBuilds.splice(index, 1);
    setBuilds(newBuilds);
  };

  const handleAddBuild = () => {
    const newBuild = {
      title: "New Build",
      buildPurpose: [],
      viableTiers: [],
      equipment: {
        MainHand: null,
        OffHand: null,
        TwoHanded: null,
        Head: null,
        Armor: null,
        Shoes: null,
        Food: null,
        Potion: null,
        Cape: null,
      },
    };
    setBuilds([...builds, newBuild]);
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("compositions")) || [];
    const updatedCompositions = saved.map((comp) =>
      comp.id.toString() === id ? { ...comp, name, builds } : comp
    );
    localStorage.setItem("compositions", JSON.stringify(updatedCompositions));
    navigate(`/composition/${id}`);
  };

  const openEditModal = (index) => {
    setEditingBuildIndex(index);
    setShowEditBuildModal(true);
  };

  const closeEditModal = () => {
    setEditingBuildIndex(null);
    setShowEditBuildModal(false);
  };

  const handleUpdateBuild = (updatedBuild) => {
    const newBuilds = [...builds];
    newBuilds[editingBuildIndex] = updatedBuild;
    setBuilds(newBuilds);
    closeEditModal();
  };

  if (!composition) {
    return <p>Composition not found.</p>;
  }

  return (
    <div className="edit-composition">
      <h1>Edit Composition</h1>
      <div className="form-group">
        <label>Composition Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="builds-list">
        <h2>Builds</h2>
        {builds.map((build, index) => (
          <div key={index} className="build-edit-item">
            <div className="build-info">
              {/* Opsiyonel: BuildCard ile küçük önizleme */}
              <BuildCard build={build} />
              <div className="build-actions">
                <button
                  className="edit-build-button"
                  onClick={() => openEditModal(index)}
                >
                  Edit Build
                </button>
                <button
                  className="delete-build-button"
                  onClick={() => handleDeleteBuild(index)}
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
        <button onClick={handleAddBuild} className="add-build-button">
          Add Build
        </button>
      </div>
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
      {showEditBuildModal && editingBuildIndex !== null && (
        <EditBuildModal
          build={builds[editingBuildIndex]}
          onSave={handleUpdateBuild}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default EditComposition;
