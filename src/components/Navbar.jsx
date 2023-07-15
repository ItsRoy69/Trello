import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Taco's Tacos
      </a>
      <ul>
        <li>
          <p>Taco & Co.</p>
        </li>{" "}
        <li>
          <p>Team Visible</p>
        </li>
      </ul>
      <div className="navigation-menu">
        <h4> ...Show Menu</h4>
      </div>
    </nav>
  );
};

export default Navbar;
