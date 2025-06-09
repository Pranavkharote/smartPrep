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
      console.log(success)
      if (success == true || success == "true") {
        handleSuccess(message);
        setTimeout(() => {
          console.log("navigating to the route");
          navigate("/questions");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          SmartPrep Signup
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <label>Enter your Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={handleOnChange}
          />
          <label>Enter you Email:</label>
          <input
            type="email"
          name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={handleOnChange}
          />
          <label>Enter you password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={handleOnChange}
          />
          <button
            type="submit"
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
    <ToastContainer/>
    </div>
  );
}

export default Signup;
