import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DarkModeToggle from "../components/ThemeToggle";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;

  // console.log("backend url :", BACKEND_URL);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };
  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };
  console.log()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
         `${BACKEND_URL}/login`,
        //  "http://localhost:8080/login",
        {
          ...userInfo,
        },
        { withCredentials: true }
      );
      
      localStorage.setItem("token", data.token);
      console.log("data : ",data)

      const { success, message, token } = data;
      console.log("token :", token);
      if (success == true || success == "true") {
        handleSuccess(message);
        setTimeout(() => { 
          navigate("/dashboard");
          console.log("navigating");

        }, 500);
      } else {
        console.log(message);
        handleError(message || "something went wrong in Login");
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }

    setUserInfo({
      ...userInfo,
      email: "",
      password: "",
    });
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 login">
  <DarkModeToggle/>
  <div className="bg-white  shadow-xl rounded-xl w-full max-w-md p-8 inlogin">
    {/* Logo / Icon */}
    <div className="flex justify-center mb-6">
      <img
        src="/ChatGPT Image Jul 12, 2025, 01_36_46 PM.png" // replace with your logo or icon // replace with your logo or icon
        alt="SmartPrep Logo"
        className="w-30 h-30"
      />
    </div>

    <h2 className="text-center mb-4 text-3xl font-bold tracking-tight text-green-600">
      SmartPrep Login
    </h2>
    <p className="text-center opacity-50 mb-6 text-sm">
      Practice coding questions, track your progress & grow!
    </p>

    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm mb-1 opacity-80">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-80"
          name="email"
          onChange={handleOnChange}
          value={email}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1 opacity-80">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-50"
          name="password"
          onChange={handleOnChange}
          value={password}
          required
        />
      </div>
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-colors duration-200">
        Log In
      </button>
    </form>

    <p className="text-center mt-4 text-gray-500 text-sm">
      Don’t have an account?{" "}
      <Link className="text-green-600 hover:underline" to="/signup">
        Sign up
      </Link>
    </p>
  </div>
  <ToastContainer />
</div>

  );
};

export default Login;
