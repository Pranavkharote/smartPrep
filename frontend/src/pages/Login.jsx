import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;

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
        "http://localhost:8080/login",
        {
          ...userInfo,
        },
        { withCredentials: true }
      );
      
      console.log(data);
      const { success, message, token } = data;
      // const token = data.data.token;
      console.log(message);
      if (success == true || success == "true") {
        localStorage.setItem("token", token);
        handleSuccess(message);
        setTimeout(() => { 
          navigate("/");
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
    <div className="min-h-screen bg-grey-800 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded w-full shadow-md max-w-sm">
        <h2 className="text-center mb-6 font-bold text-2xl">SmartPrep Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label>Enter your Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 border rounded"
            name="email"
            onChange={handleOnChange}
            value={email}
          />
          <label>Enter password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full px-4 py-2 border rounded"
            onChange={handleOnChange}
            value={password}
            name="password"
          />
          <button className="w-full bg-green-600 hover:bg-green-700 rounded py-2 text-white">
            Login
          </button>
          <p className="text-center mt-4">
            Dont have an account{" "}
            <Link className="text-blue-600 hover:underline" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
