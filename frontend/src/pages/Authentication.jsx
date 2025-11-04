import React, { useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserLock, FaUserPlus } from "react-icons/fa";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState(0); // 0 = login, 1 = register
  const passwordRef = useRef(null);
  const router = useNavigate();
  const { handleRegister, handleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (formState === 0 && passwordRef.current) passwordRef.current.focus();
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
        router("/dashboard");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          {formState === 0 ? "Welcome Back 👋" : "Join SmartPrep 🚀"}
        </h1>

        {/* Toggle */}
        <div className="flex mb-6 border border-green-200 dark:border-green-800 rounded-xl overflow-hidden">
          <button
            className={`flex-1 py-2 font-semibold ${
              formState === 0
                ? "bg-green-600 text-white"
                : "bg-transparent text-green-600 dark:text-green-400"
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
                : "bg-transparent text-green-600 dark:text-green-400"
            }`}
            onClick={() => setFormState(1)}
          >
            <FaUserPlus className="inline mr-2" />
            Signup
          </button>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4"
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
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            {formState === 0 ? "Login" : "Register"}
          </motion.button>
        </form>

        {/* Link */}
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          {formState === 0 ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setFormState(1)}
                className="text-green-600 hover:underline font-semibold"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                onClick={() => setFormState(0)}
                className="text-green-600 hover:underline font-semibold"
              >
                Login
              </button>
            </>
          )}
        </p>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-green-600 dark:hover:text-green-400"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>

      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </div>
  );
}
