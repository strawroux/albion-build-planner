import React, { useRef } from "react";
import html2canvas from "html2canvas";

function CompositionSaver({ compositionName, compositionRef }) {
  const handleSaveAsImage = async () => {
    if (!compositionRef.current) return;

    // Seçili alanın ekran görüntüsünü al
    const canvas = await html2canvas(compositionRef.current, {
      backgroundColor: null, // Arkaplan şeffaf olacak
      scale: 2, // Yüksek çözünürlük için ölçek arttırıldı
    });

    // Görüntüyü indir
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${compositionName || "composition"}.png`;
    link.click();
  };

  return (
    <button onClick={handleSaveAsImage} className="save-button">
      Kompozisyonu PNG olarak kaydet
    </button>
  );
}

export default CompositionSaver;
