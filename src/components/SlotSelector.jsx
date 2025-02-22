import React, { useState } from "react";
import ItemSelector from "./ItemSelector";
import "./SlotSelector.css";

function SlotSelector({ slotName, selectedItem, onSelectItem, isDisabled }) {
    const [showItemSelector, setShowItemSelector] = useState(false);
  
    return (
      <div className="slot-selector">
        <h4>{slotName}</h4>
        {selectedItem ? (
          <div>
            <img
              src={`https://render.albiononline.com/v1/item/${selectedItem.UniqueName}.png?size=64`}
              alt={selectedItem.Name}
              loading="lazy"
            />
          </div>
        ) : (
          <p>Henüz seçilmedi</p>
        )}
        <button onClick={() => setShowItemSelector(true)} disabled={isDisabled}>
          Seç
        </button>
        {showItemSelector && (
          <ItemSelector
            slotFilter={slotName}
            onClose={() => setShowItemSelector(false)}
            onItemSelect={(item) => {
              onSelectItem(item);
              setShowItemSelector(false);
            }}
          />
        )}
      </div>
    );
  }
  
  export default SlotSelector;
