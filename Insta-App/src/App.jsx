// import { Routes, Route, useLocation } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Login from "./pages/Landing/Signin";
// import Signup from "./pages/Landing/Register";
// import Home from "./pages/Home/Home";
// import Discover from "./pages/Discover/Discover";
// import Profile from "./pages/Profile/Profile";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Post from "./pages/Post/Post";

// function Layout() {
//   const location = useLocation();

//   const hideLayout =
//     location.pathname === "/" || location.pathname === "/signup";

//   return (
//     <>
//       {!hideLayout && <Navbar />}

//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected routes */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/discover"
//           element={
//             <ProtectedRoute>
//               <Discover />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/post"
//           element={
//             <ProtectedRoute>
//               <Post />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// export default Layout;


import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Landing/Signin";
import Signup from "./pages/Landing/Register";
import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Post from "./pages/Post/Post";
import "./App.css";


// function Layout() {
//   const location = useLocation();

//   const hideLayout =
//     location.pathname === "/" || location.pathname === "/signup";

//   return (
//     <>
//       {!hideLayout && <Navbar />}

//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected routes */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/discover"
//           element={
//             <ProtectedRoute>
//               <Discover />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/post"
//           element={
//             <ProtectedRoute>
//               <Post />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// export default Layout;


function App() {
  const location = useLocation();

  const hideLayout =
  location.pathname === "/login" ||
  location.pathname === "/signup" ||
  location.pathname === "/";


  return (
    <div className="app-layout">
      {!hideLayout && <Navbar />}

      <div className="app-main">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <Discover />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}

export default App;
