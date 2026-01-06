import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import { useAuth } from "../context/AuthContext";
import LogoutModal from "./LogoutModal";


export default function Sidebar() 
{
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);


  function confirmLogout() 
  {
    logout();
    navigate("/login");
  }


  return (
    <>
      
      <aside className="sidebar">
        
        <div>
          
          <div className="sidebar-logo">CONNECT</div>

          <nav className="sidebar-links">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/discover">Explore</NavLink>
            <NavLink to="/messages">Messages</NavLink>
            <NavLink to="/notifications">Notifications</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
        
        </div>

        <div className="sidebar-actions">
          
          <button className="sidebar-btn">+ Create</button>

          <button
            className="sidebar-btn logout"
            onClick={() => setShowLogout(true)}
          >
            Logout
          </button>

        </div>

      </aside>


      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={confirmLogout}
        />
      )}

    </>
    
  );
}
