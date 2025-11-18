import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Landing/Login";
import Signup from "./pages/Landing/Signup";
import "./App.css";

function App() 
{
  const path = window.location.pathname;

  if (path === "/login") 
  {
    return <Login />;
  }

  if (path === "/signup") 
  {
    return <Signup />;
  }

  if (path === "/home") 
  {
    return (
      <div className="app-main-bg">
        <Navbar />
        <Home />
      </div>
    );
  }

  return <Landing />;
}

export default App;
