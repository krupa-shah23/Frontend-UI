import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-bg">
      <h1>Welcome to Insta-App</h1>
      
      <form
          onSubmit={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      >

        <button type="submit">Login</button>
      </form>
      <div
        style={{ color: "#0095f6", marginTop: "20px", cursor: "pointer" }}
        onClick={() => navigate("/signup")}
      >
        Create New Account
      </div>
    </div>
  );
};
export default Landing;
