import React from "react";
import "./BuildCard.css";

function BuildCard({ build }) {
    const { title, equipment } = build;
  
    // Silah slotlarını ve boşlukları ayarla
    let weaponSlots = [];
    if (equipment.TwoHanded) {
      weaponSlots.push(equipment.TwoHanded);
      weaponSlots.push(null); // Hizalama için boş slot
    } else {
      weaponSlots.push(equipment.MainHand || null);
      weaponSlots.push(equipment.OffHand || null);
    }
  
    // Diğer slotları ekle
    const otherSlots = ["Head", "Armor", "Shoes", "Cape", "Food", "Potion"]
      .map(slot => equipment[slot] || null);
  
    const allSlots = [...weaponSlots, ...otherSlots];
  
    return (
      <div className="build-card">
        <h2 className="build-title">{title}</h2>
        <div className="equipment-grid">
          {allSlots.map((item, index) => (
            <div 
              key={index}
              className={`equipment-slot ${!item ? 'empty-space' : ''}`}
            >
              {item && (
                <img
                  src={`https://render.albiononline.com/v1/item/${item.UniqueName}.png?size=64`}
                  alt={item.Name}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

export default BuildCard;