import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import Profile from "./pages/Profile/Profile";


function App() 
{
  const { pathname } = useLocation();
  const publicRoutes = ["/", "/login", "/register"];
  const showSidebar = !publicRoutes.includes(pathname);

  return (
    <div className="app-layout">
      {showSidebar && <Sidebar />}


      <main className={`main-content ${showSidebar ? "with-sidebar" : ""}`}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* PROTECTED ROUTES */}
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
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
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
      </main>
    </div>
  );
}

export default App;
