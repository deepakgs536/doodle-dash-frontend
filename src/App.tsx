import { Route, Routes, Navigate } from "react-router";
import { useEffect, useState } from "react";

import { SignInPage } from "./pages/signIn";
import { SignUpPage } from "./pages/signUp";
import { HomePage } from "./pages/home";
import DrawingGameInterface from "./components/mainCanvas";
import DashboardPage from "./pages/dashboard";
import CreateRoomPage from "./pages/createRoomPage";
import JoinRoomPage from "./pages/joinRoomPage";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Keep token in sync if it's updated in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Private Route wrapper
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return token ? children : <Navigate to="/" replace />;
  };

  // Public Route wrapper
  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    return !token ? children : <Navigate to="/dashboard" replace />;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
      <Route path="/signIn" element={<PublicRoute><SignInPage setToken={setToken} /></PublicRoute>} />
      <Route path="/signUp" element={<PublicRoute><SignUpPage /></PublicRoute>} />

      {/* Private Routes */}
      <Route path="/room/:roomId" element={<PrivateRoute><DrawingGameInterface /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage setToken={setToken} /></PrivateRoute>} />
      <Route path="/createRoom" element={<PrivateRoute><CreateRoomPage /></PrivateRoute>} />
      <Route path="/joinRoom" element={<PrivateRoute><JoinRoomPage /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
