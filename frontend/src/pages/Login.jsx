import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import DarkModeToggle from "../components/ThemeToggle";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await handleLogin(email, password);

    if (res.success) {
      toast.success(res.message);
      navigate("/dashboard");
    } else {
      toast.error(res.message);
    }

    setLoading(false);
    setUserInfo({ email: "", password: "" });
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6">
    <DarkModeToggle />

    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
      <div className="flex justify-center mb-6">
        <img
          src="/ChatGPT Image Jul 12, 2025, 01_36_46 PM.png"
          alt="SmartPrep Logo"
          className="w-24 h-24"
        />
      </div>

      <h2 className="text-center mb-2 text-3xl font-extrabold tracking-wide">
        Smart<span className="text-indigo-400">Prep</span> Login
      </h2>

      <p className="text-center text-gray-400 mb-8 text-sm">
        Practice coding, track progress, and grow consistently
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1 text-gray-400">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500"
            name="email"
            onChange={handleOnChange}
            value={email}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-400">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500"
            name="password"
            onChange={handleOnChange}
            value={password}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold py-3 rounded-2xl transition shadow-lg"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400 text-sm">
        Don’t have an account?{" "}
        <Link className="text-indigo-400 hover:underline" to="/signup">
          Sign up
        </Link>
      </p>
    </div>

    <ToastContainer />
  </div>
);

};

export default Login;
