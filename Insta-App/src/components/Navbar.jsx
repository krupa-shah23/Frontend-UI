import React from "react";
import "./Navbar.css";
import { FaHome, FaCompass, FaSearch, FaFilm, FaEnvelope, FaBell, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar-vertical">
      <div className="navbar-logo">InstaGram</div>
      <ul className="navbar-links-vertical">
        <li className="active"><FaHome /> Home</li>
        <li><FaCompass /> Explore</li>
        <li><FaSearch /> Search</li>
        <li><FaFilm /> Reels</li>
        <li style={{ position: "relative" }}>
          <FaEnvelope /> Messages <span className="message-badge">5</span>
</li>
        <li><FaBell /> Notifications</li>
        <li><FaUser /> Profile</li>
      </ul>
    </nav>
  );
}

export default Navbar;
