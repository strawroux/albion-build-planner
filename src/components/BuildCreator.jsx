import React, { useState } from "react";
import SlotSelector from "./SlotSelector";
import "./BuildCreator.css";

function BuildCreator({ onSaveBuild }) {
    const [title, setTitle] = useState("");
    const [buildPurpose, setBuildPurpose] = useState([]); // Örn: PvP, PvE vs.
    const [viableTiers, setViableTiers] = useState([]);
    const [equipment, setEquipment] = useState({
      MainHand: null,
      OffHand: null,
      TwoHanded: null,
      Head: null,
      Armor: null,
      Shoes: null,
      Food: null,
      Potion: null,
      Cape: null
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
  
    const handleSaveBuild = () => {
      const newBuild = {
        title,
        buildPurpose,
        viableTiers,
        equipment
      };
      onSaveBuild(newBuild);
      // Form sıfırlama
      setTitle("");
      setBuildPurpose([]);
      setViableTiers([]);
      setEquipment({
        MainHand: null,
        OffHand: null,
        TwoHanded: null,
        Head: null,
        Armor: null,
        Shoes: null,
        Food: null,
        Potion: null,
        Cape: null
      });
    };
  
    return (
      <div className="build-creator">
        <h2>Yeni Build Oluştur</h2>
        <div className="build-form-container">
          <div className="build-details">
            <div className="title-section">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="build-options">
              <div className="build-purpose">
                <p>Build Made For:</p>
                <label>
                  <input
                    type="checkbox"
                    checked={buildPurpose.includes("PvP")}
                    onChange={() => handleBuildPurposeChange("PvP")}
                  />
                  PvP
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={buildPurpose.includes("PvE")}
                    onChange={() => handleBuildPurposeChange("PvE")}
                  />
                  PvE
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={buildPurpose.includes("Ganking")}
                    onChange={() => handleBuildPurposeChange("Ganking")}
                  />
                  Ganking
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={buildPurpose.includes("Escape/Gathering")}
                    onChange={() => handleBuildPurposeChange("Escape/Gathering")}
                  />
                  Escape/Gathering
                </label>
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
          </div>
          <div className="item-selection">
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
          </div>
        </div>
        <button onClick={handleSaveBuild}>Kaydet</button>
      </div>
    );
  }
  
  export default BuildCreator;