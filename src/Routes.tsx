import { Routes as ReactRoutes, Route, Navigate, useNavigate } from "react-router-dom";
import './App.css';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Messenger";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { setUnauthorizedHandler } from "./library/chatApi";
import AuthRequiredRoute from "./components/AuthRequiredRoute";

export default function Routes() {
  const navigate = useNavigate();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  return (
    <ReactRoutes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/logout" element={<AuthRequiredRoute><Logout /></AuthRequiredRoute>} />
      <Route path="/chat" element={<AuthRequiredRoute><Chat /></AuthRequiredRoute>} />
    </ReactRoutes>
  );
}
