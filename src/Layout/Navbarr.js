// Navbar.js
import React from "react";

const Navbar = ({ toggleCol11 }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Your App</span>
        <button className="btn btn-primary" onClick={toggleCol11}>
          Toggle Col 11
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
