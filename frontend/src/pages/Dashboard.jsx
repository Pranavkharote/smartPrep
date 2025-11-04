import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../assets/Loader";
import DarkModeToggle from "../components/ThemeToggle";
import "../index.css";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/submission-history`
          // "http://localhost:8080/submission-history"
          , {
          withCredentials: true,
        });
        // setHistory(res.data.submission);
        setHistory(
          Array.isArray(res.data.submission) ? res.data.submission : []
        );
        console.log("Fetched history:", res.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching submission history:", err);
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  const totalTime = Array.isArray(history)
    ? history.reduce(
        (sum, item) =>
          sum + (typeof item.timeTaken === "number" ? item.timeTaken : 0),
        0
      )
    : 0;

const formatTimeFromSeconds = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = [];
  if (hrs > 0) result.push(`${hrs}h`);
  if (mins > 0 || hrs > 0) result.push(`${mins}m`); // include mins if hours exist
  result.push(`${secs}s`);

  return result.join(" ");
};


  const formatTimeInSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const solvedCount = Array.isArray(history)
    ? history.filter((item) => item.status === "solved").length
    : 0;

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      {/* <Expand duration={750}  /> */}
      <DarkModeToggle />
      

      <button className="ml-4 bg-transparent border-1 px-4 py-1 rounded-md"><Link to="/"><FaHome className="text-xl cursor-pointer hover:text-green-400" title="Home" /></Link></button>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="ml-4 bg-transparent border-1 px-4 py-1 rounded-md"
      >
        <FaSignOutAlt className="text-xl cursor-pointer hover:text-red-400" title="Logout" />
      </button>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto "
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-blue-700 mb-6 colorText typing"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          👋 Welcome, {name || "Coder"}!
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
         SmartPrep – Bridging learning and industry-ready coding practice.
        </motion.p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 ">
          {[
            {
              title: "Questions Solved",
              value: solvedCount || 0,
              color: "text-green-600",
            },
            {
              title: "Submissions",
              //value: history.length || 0,
              value: Array.isArray(history) ? history.length : 0,
              color: "text-blue-600",
            },
            {
              title: "Time Spent (mins)",
              value: formatTimeFromSeconds(totalTime) || 0,
              color: "text-purple-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="dashCard p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
            >
              <h2 className="text-lg text-gray-500 mb-1">{item.title}</h2>
              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <motion.button
            onClick={() => (window.location.href = "/questions")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md text-lg font-semibold transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Solve a New Question
          </motion.button>
        </div>

        {/* Recent Submissions */}
        <div className="mb-10">
          <h2 className="text-2xl  mb-4">📝 Recent Submissions</h2>
          {history.length === 0 ? (
            <p className="">No submissions yet. Start solving!</p>
          ) : (
            <div className="space-y-4 max-h-100 overflow-y-auto  ">
              {history.map((sub, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="dashCard p-5 rounded-xl shadow-xl flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="text-lg font-semibold ">
                      {sub?.questionId?.title || "unknown"}
                    </p>
                    <p className="text-sm opacity-70 ">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          sub.status === "solved"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }`}
                      >
                        {sub.status}
                      </span>{" "}
                      | Time: {formatTimeInSeconds(sub.timeTaken)}
                    </p>
                    <p className="text-sm opacity-70 ">
                      Time: {new Date(sub.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white  px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm font-medium">
                    <a href="/submission">View</a>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-xl w-80">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to logout?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
