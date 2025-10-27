import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Landing/Login";
import Signup from "./pages/Landing/Signup";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import Discover from "./pages/Discover/Discover";


export default function RoutesList() 
{
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Home />} />

      <Route path="/post" element={<Post />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/discover" element={<Discover />} />

      <Route
        path="*"
        element={<div style={{ padding: 40 }}>404 - Page Not Found</div>}
      />
    </Routes>
  );
}