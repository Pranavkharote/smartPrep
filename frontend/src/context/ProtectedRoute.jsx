// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = () => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}`, { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <p className="absolute bottom-1 right-0">.</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
