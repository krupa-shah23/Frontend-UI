import { Routes, Route, useLocation } from "react-router-dom";

import Signup from "./pages/Landing/Signin";
import Login from "./pages/Landing/Register";
import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";  
import Profile from "./pages/Profile/Profile";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Post from "./pages/Post/Post";


function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" || location.pathname === "/signup";

    function PrivateRoute({ element }) {
  const auth = localStorage.getItem("auth");
  return auth ? element : <Login />;
}

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
      <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>



      {!hideLayout && <Footer />}
    </>
  );
}

export default Layout;
