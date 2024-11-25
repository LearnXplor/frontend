import React from "react";
import "./Header.css"; // CSS for styling
import DropdownComponent from "./DropdownComponent";

const HeaderComponent = () => {
  return (
    <div className="navbar">
      <h1 className="logo px-2">EMS</h1>
      <div className="navbar-right">
        <DropdownComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
