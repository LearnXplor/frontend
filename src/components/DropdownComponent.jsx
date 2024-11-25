import React, { useState } from "react";
import "./Dropdown.css"; // CSS for styling
import { useNavigate } from "react-router-dom";

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const clearLocalStorage = () => {
    localStorage.clear();
    navigate('/login');
  }

  // Handle logout action
  const handleLogout = () => {
    console.log("Logging out...");
    clearLocalStorage();
  };

  return (
    <div className="dropdown">
      {/* User avatar or name */}
      <button className="dropdown-btn" onClick={toggleDropdown}>
        <img
          src="https://via.placeholder.com/40" 
          alt="Profile"
          className="avatar"
        />
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="dropdown-content">
          <a href="/profile">Profile</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
