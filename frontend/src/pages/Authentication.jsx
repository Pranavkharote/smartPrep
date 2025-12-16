import React, { useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import DarkModeToggle from "../components/ThemeToggle";
import "react-toastify/dist/ReactToastify.css";
import { FaUserLock, FaUserPlus } from "react-icons/fa";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState(0); // 0 = login, 1 = register
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { handleRegister, handleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (passwordRef.current) passwordRef.current.focus();
  }, [formState]);

  const handleAuth = async () => {
    if (!email || !password || (formState === 1 && !name)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    let result;
    if (formState === 0) {
      result = await handleLogin(email, password);
      if (result.success) {
        toast.success(result.message);
        navigate("/dashboard");
      } else toast.error(result.message);
    } else {
      result = await handleRegister(name, email, password);
      if (result.success) {
        toast.success(result.message);
        setFormState(0);
      } else toast.error(result.message);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 text-white">
    {/* <DarkModeToggle /> */}

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl px-8 py-10"
    >
      <div className="flex justify-center mb-6">
        <img
          src="/ChatGPT Image Jul 12, 2025, 01_36_46 PM.png"
          alt="SmartPrep Logo"
          className="w-24 h-24 rounded-full shadow-lg"
        />
      </div>

      <h2 className="text-center mb-2 text-3xl font-extrabold tracking-wide">
        {formState === 0 ? "Login" : "Create Account"}
      </h2>

      <p className="text-center text-sm text-gray-400 mb-6">
        Practice coding, track progress, and grow consistently
      </p>

      {/* Toggle */}
      <div className="flex mb-6 bg-black/30 rounded-2xl p-1">
        <button
          className={`flex-1 py-2 rounded-xl font-semibold transition ${
            formState === 0
              ? "bg-gradient-to-r from-indigo-600 to-purple-600"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setFormState(0)}
        >
          <FaUserLock className="inline mr-2" />
          Login
        </button>

        <button
          className={`flex-1 py-2 rounded-xl font-semibold transition ${
            formState === 1
              ? "bg-gradient-to-r from-indigo-600 to-purple-600"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setFormState(1)}
        >
          <FaUserPlus className="inline mr-2" />
          Signup
        </button>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        {formState === 1 && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500"
        />

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500"
        />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-2xl font-bold shadow-lg hover:brightness-110 transition"
        >
          {formState === 0 ? "Login" : "Sign Up"}
        </motion.button>
      </form>

      <div className="text-center mt-6">
        <Link to="/" className="text-sm text-gray-400 hover:text-indigo-400">
          ← Back to Home
        </Link>
      </div>
    </motion.div>

    <ToastContainer position="bottom-right" />
  </div>
);

}
