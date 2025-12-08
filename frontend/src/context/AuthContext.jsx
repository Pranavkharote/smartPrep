// baseURL: "https://smartprep-ij87.onrender.com",
import axios from "axios";
import httpStatus from "http-status";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

// ✅ LOCAL BACKEND ONLY
const client = axios.create({
  baseURL:
  //  "http://localhost:8080",
  "https://smartprep-ij87.onrender.com",
});

// ✅ Attach token automatically for protected routes
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // ✅ AUTO LOAD USER ON REFRESH (if token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      client
        .get("/me") // ✅ you must have this route OR remove this block
        .then((res) => setUserData(res.data.user))
         .catch((err) => {
        console.error("Session restore failed:", err);
        localStorage.removeItem("token");
        setUserData(null);
      });
    }
  }, []);

  // ✅ REGISTER
  const handleRegister = async (name, email, password) => {
    try {
      const res = await client.post("/signup", { name, email, password });

      if (res.status === httpStatus.CREATED) {
        return {
          success: true,
          message: res.data.message || "Registered successfully",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // ✅ LOGIN (ONLY PLACE WHERE TOKEN IS STORED)
  const handleLogin = async (email, password) => {
    try {
      const res = await client.post("/login", { email, password });

      if (res.status === httpStatus.OK && res.data.token) {
        localStorage.setItem("token", res.data.token); // ✅ ONLY HERE
        setUserData(res.data.user);

        return {
          success: true,
          message: res.data.message || "Login successful",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ LOGOUT (CRITICAL)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
