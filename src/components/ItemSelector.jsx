import React, { useState, useEffect } from "react";
import "./ItemSelector.css";

const ITEM_URL =
  "https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.txt";

// TXT içeriğini ayrıştıran fonksiyon
function parseItems(text) {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const items = lines.map((line) => {
    // Beklenen format: "2021: T7_OFF_SHIELD_HELL@3 : Grandmaster's Caitiff Shield"
    const parts = line.split(":");
    if (parts.length < 3) return null;
    const id = parts[1].trim();
    const name = parts.slice(2).join(":").trim();
    // Tier: ID’nin başındaki T'den sonra gelen sayı
    const tierMatch = id.match(/^T(\d+)_/);
    const tier = tierMatch ? parseInt(tierMatch[1], 10) : 0;
    // Slot: T{tier}_ kısmını çıkartıp, kalan string’in ilk token’ı
    const afterTier = id.replace(/^T\d+_/, "");
    const slotToken = afterTier.split("_")[0];
    const slotMapping = {
      MAIN: "MainHand",
      OFF: "OffHand",
      "2H": "TwoHanded",
      HEAD: "Head",
      ARMOR: "Armor",
      SHOES: "Shoes",
      CAPEITEM: "Cape",
      MEAL: "Food",
      POTION: "Potion"
    };
    const slot = slotMapping[slotToken] || slotToken;
    // Enchantment: ID’de "@" varsa, sonrasında gelen sayı; yoksa 0
    const enchantMatch = id.match(/@(\d+)/);
    const enchantment = enchantMatch ? parseInt(enchantMatch[1], 10) : 0;

    return {
      UniqueName: id,
      Name: name,
      Tier: tier,
      Slot: slot,
      Enchantment: enchantment
    };
  });
  return items.filter((item) => item !== null);
}

function ItemSelector({ slotFilter, onClose, onItemSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState(
    slotFilter ? [slotFilter] : []
  );
  const [itemsArray, setItemsArray] = useState([]);

  // TXT dosyasını fetch edip ayrıştırıyoruz
  useEffect(() => {
    fetch(ITEM_URL)
      .then((response) => response.text())
      .then((text) => {
        const parsedItems = parseItems(text);
        setItemsArray(parsedItems);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleTierChange = (tier) => {
    if (selectedTiers.includes(tier)) {
      setSelectedTiers(selectedTiers.filter((t) => t !== tier));
    } else {
      setSelectedTiers([...selectedTiers, tier]);
    }
  };

  const handleSlotChange = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const filteredItems = itemsArray.filter((item) => {
    const matchesSearch = item.Name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTier =
      selectedTiers.length === 0 || selectedTiers.includes(item.Tier);
    const matchesSlot =
      selectedSlots.length === 0 || selectedSlots.includes(item.Slot);
    return matchesSearch && matchesTier && matchesSlot;
  });

  return (
    <div className="item-selector-modal">
      <button onClick={onClose}>Kapat</button>
      <div className="filters">
        <input
          type="text"
          placeholder="İsim ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <p>Tier Seçimi:</p>
          {[2, 3, 4, 5, 6, 7, 8].map((tier) => (
            <label key={tier}>
              <input
                type="checkbox"
                checked={selectedTiers.includes(tier)}
                onChange={() => handleTierChange(tier)}
              />
              T{tier}
            </label>
          ))}
        </div>
        <div>
          <p>Slot Seçimi:</p>
          {[
            "MainHand",
            "OffHand",
            "TwoHanded",
            "Head",
            "Armor",
            "Shoes",
            "Cape",
            "Food",
            "Potion"
          ].map((slot) => (
            <label key={slot}>
              <input
                type="checkbox"
                checked={selectedSlots.includes(slot)}
                onChange={() => handleSlotChange(slot)}
                disabled={Boolean(slotFilter)}
              />
              {slot}
            </label>
          ))}
        </div>
      </div>
      <div className="item-list">
        {filteredItems.map((item) => (
          <div
            key={item.UniqueName}
            className="item-card"
            onClick={() => onItemSelect(item)}
          >
            <img
              src={`https://render.albiononline.com/v1/item/${item.UniqueName}.png?size=64`}
              alt={item.Name}
              loading="lazy"
            />
            <p>{item.Name}</p>
            <p>Tier: {item.Tier}</p>
            {item.Enchantment > 0 && <p>Enchantment: {item.Enchantment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemSelector;
