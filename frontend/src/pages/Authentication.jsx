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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 relative px-4 login">
      <DarkModeToggle />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white inlogin shadow-xl rounded-2xl w-full max-w-md px-8 py-10"
      >
        
        <div className="flex justify-center mb-4">
          <img
            src="/ChatGPT Image Jul 12, 2025, 01_36_46 PM.png"
            alt="SmartPrep Logo"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>
 
        <h2 className="text-center mb-2 text-3xl font-bold tracking-tight text-green-600">
          {formState === 0 ? "Login" : "Signup"}
        </h2>
        <p className="text-center text-sm opacity-70 mb-6">
          Practice coding questions, track your progress & grow!
        </p>

      
        <div className="flex mb-6 border border-green-200 rounded-xl overflow-hidden">
          <button
            className={`flex-1 py-2 font-semibold ${
              formState === 0
                ? "bg-green-600 text-white"
                : "bg-transparent text-green-600"
            }`}
            onClick={() => setFormState(0)}
          >
            <FaUserLock className="inline mr-2" />
            Login
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              formState === 1
                ? "bg-green-600 text-white"
                : "bg-transparent text-green-600"
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
            <>
              <label className="block text-sm mb-1 opacity-80">
                Enter your Full Name:
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-90"
              />
            </>
          )}

          <label className="block text-sm mb-1 opacity-80">
            Enter your Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-90"
          />

          <label className="block text-sm mb-1 opacity-80">
            Enter your Password:
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-90"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-3"
          >
            {formState === 0 ? "Login" : "Sign Up"}
          </motion.button>
        </form>

  

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-green-600 dark:hover:text-green-400"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}
