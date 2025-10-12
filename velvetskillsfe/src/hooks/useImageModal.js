import { useState } from "react";

export const useImageModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const openImage = (src) => {
    setImageSrc(src);
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
    setImageSrc("");
  };

  // Komponenta modala za prikaz slikee
  const ImageModal = () =>
    isOpen ? (
      <div className="image-modal-overlay" onClick={closeImage}>
        <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
          <img src={imageSrc} alt="Fullscreen prikaz" className="image-modal-img" />
          <button className="image-modal-close" onClick={closeImage}>
            ✕
          </button>
        </div>
      </div>
    ) : null;

  return { openImage, ImageModal };
};
