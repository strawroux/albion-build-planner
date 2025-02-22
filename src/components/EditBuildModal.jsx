import React, { useState } from "react";
import SlotSelector from "./SlotSelector";
import "./EditBuildModal.css";

function EditBuildModal({ build, onSave, onClose }) {
  const [title, setTitle] = useState(build.title || "");
  const [buildPurpose, setBuildPurpose] = useState(build.buildPurpose || []);
  const [viableTiers, setViableTiers] = useState(build.viableTiers || []);
  const [equipment, setEquipment] = useState(build.equipment || {
    MainHand: null,
    OffHand: null,
    TwoHanded: null,
    Helmet: null,
    Armor: null,
    Shoes: null,
    Food: null,
    Potion: null,
    Cape: null,
  });

  const handleBuildPurposeChange = (purpose) => {
    if (buildPurpose.includes(purpose)) {
      setBuildPurpose(buildPurpose.filter((p) => p !== purpose));
    } else {
      setBuildPurpose([...buildPurpose, purpose]);
    }
  };

  const handleTierChange = (tier) => {
    if (viableTiers.includes(tier)) {
      setViableTiers(viableTiers.filter((t) => t !== tier));
    } else {
      setViableTiers([...viableTiers, tier]);
    }
  };

  const handleSave = () => {
    const updatedBuild = {
      title,
      buildPurpose,
      viableTiers,
      equipment,
    };
    onSave(updatedBuild);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Build</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="build-options">
          <div className="build-purpose">
            <p>Build Made For:</p>
            {["PvP", "PvE", "Ganking", "Escape/Gathering"].map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={buildPurpose.includes(option)}
                  onChange={() => handleBuildPurposeChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="viable-tiers">
            <p>Viable Tiers:</p>
            {[4, 5, 6, 7, 8].map((tier) => (
              <label key={tier}>
                <input
                  type="checkbox"
                  checked={viableTiers.includes(tier)}
                  onChange={() => handleTierChange(tier)}
                />
                T{tier}
              </label>
            ))}
          </div>
        </div>
        <div className="slots">
          {Object.keys(equipment).map((slotKey) => (
            <SlotSelector
              key={slotKey}
              slotName={slotKey}
              selectedItem={equipment[slotKey]}
              onSelectItem={(item) =>
                setEquipment({ ...equipment, [slotKey]: item })
              }
            />
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button-modal">
            Save Build
          </button>
          <button onClick={onClose} className="cancel-button-modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBuildModal;
