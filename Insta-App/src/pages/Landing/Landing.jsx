import React from "react";
import "./Landing.css";

const Landing = () => {
  return (

    <div className="form" style={{ minHeight: "180px", paddingTop: "40px" }}>
      
      <div className="loginlabel" style={{ marginBottom: "24px" }}>
        Instagram
      </div>
      
      <h2 style={{ color: "#fff", fontSize: "1.18rem", marginBottom: "23px" }}>
        Welcome! Please login or sign up below:
      </h2>
      
      <div style={{ width: "100%" }}>
        
        <a href="/login">
          <button className="loginbutton" style={{ marginBottom: "10px" }}>Login</button>
        </a>
        
        <a href="/signup">
          <button className="signup-button">Sign Up</button>
        </a>
      
      </div>
    
    </div>
  );
};

export default Landing;
