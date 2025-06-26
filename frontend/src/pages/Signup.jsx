import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, name, password } = userInfo;

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/signup",
        {
          ...userInfo,
        },
        {
          withCredentials: true,
        }
      );
      const { success, message } = data;
      localStorage.setItem("name", data.name);
      console.log(data);
      console.log(success);
      if (success == true || success == "true") {
        handleSuccess(message);
        setTimeout(() => {
          console.log("navigating to the route");
          navigate("/");
        }, 500);
      } else {
        handleError(message || "something wrong");
      }
    } catch (err) {
      console.log(err);
      handleError(err);
    }
    setUserInfo({
      ...userInfo,
      email: "",
      name: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 login">
      <div className="bg-white  shadow-xl rounded-xl w-full max-w-md p-7 inlogin">
        <div className="flex justify-center mb-6">
          <img
            src="src/assets/ChatGPT Image Jun 13, 2025, 02_34_46 PM.png" // replace with your logo or icon
            alt="SmartPrep Logo"
            className="w-20 h-20"
          />
        </div>
        <h2 className="text-center mb-4 text-3xl font-bold tracking-tight text-green-600">
          SmartPrep Signup
        </h2>
        <p className="text-center opacity-50 mb-6 text-sm">
          Practice coding questions, track your progress & grow!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm mb-1 opacity-80">
            Enter your Full Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-80"
          />
          <label className="block text-sm mb-1 opacity-80">
            Enter you Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-80"
            value={email}
            onChange={handleOnChange}
          />
          <label className="block text-sm mb-1 opacity-80">
            Enter you password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-80"
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 opacity-80"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
