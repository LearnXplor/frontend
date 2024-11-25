import React from "react";
import "./Popup.css"; // Add styles for the popup

const Popup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>{message || "Are you sure you want to delete?"}</h3>
        <div className="popup-buttons">
          <button className="popup-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="popup-cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
