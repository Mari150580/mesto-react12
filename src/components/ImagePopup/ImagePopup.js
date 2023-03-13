import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_zoom ${card ? "popup_opened" : ""}`}>
      <div className="popup__block">
        <button
          className="popup__close popup__close_zoom"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__heading">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
