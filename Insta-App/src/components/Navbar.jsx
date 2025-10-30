import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCompass, FaSearch, FaFilm, FaEnvelope, FaBell, FaUser } from "react-icons/fa";

function Navbar() 
{
  const location = useLocation();

  return (
    <nav className="navbar-vertical">
      <div className="navbar-logo">InstaClone</div>

      <ul className="navbar-links-vertical">

        <li className={location.pathname === "/home" ? "active" : ""}>
          <Link to="/home">
            <FaHome /> Home
          </Link>
        </li>

        <li className={location.pathname === "/post" ? "active" : ""}>
          <Link to="/post">
            <FaCompass /> Post
          </Link>
        </li>

        <li className={location.pathname === "/discover" ? "active" : ""}>
          <Link to="/discover">
            <FaSearch /> Discover
          </Link>
        </li>

        <li className={location.pathname === "/reels" ? "active" : ""}>
          <Link to="/reels">
            <FaFilm /> Reels
          </Link>
        </li>

        <li className={location.pathname === "/messages" ? "active" : ""} style={{ position: "relative" }}>
          <Link to="/messages">
            <FaEnvelope /> Messages
            <span className="message-badge">5</span>
          </Link>
        </li>

        <li className={location.pathname === "/notifications" ? "active" : ""}>
          <Link to="/notifications">
            <FaBell /> Notifications
          </Link>
        </li>

        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
          <FaUser /> Profile
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
