import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import Loader from "../assets/Loader";
import DarkModeToggle from "../components/ThemeToggle";
import "../index.css";
import { Link } from "react-router-dom";
import { FaHome, FaFire, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { userData, handleLogout } = useContext(AuthContext);

  // ✅ Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // ✅ Avatar initials
  const getInitials = (name = "") => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // ✅ Fetch submission history (JWT auto-attached)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/submission-history");
        setHistory(
          Array.isArray(res.data.submission) ? res.data.submission : []
        );
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

  const totalTime = history.reduce(
    (sum, item) =>
      sum + (typeof item.timeTaken === "number" ? item.timeTaken : 0),
    0
  );

  const formatTimeFromSeconds = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = [];
    if (hrs > 0) result.push(`${hrs}h`);
    if (mins > 0 || hrs > 0) result.push(`${mins}m`);
    result.push(`${secs}s`);

    return result.join(" ");
  };

  const formatTimeInSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const solvedCount = history.filter((item) => item.status === "solved").length;

  const handleConfirmLogout = () => {
    handleLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold tracking-wide">
          Smart<span className="text-indigo-400">Prep</span>
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <FaHome />
          </Link>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/40 transition"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-10"
      >
        <div className="flex items-center gap-5 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg">
            {getInitials(userData?.name)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {getGreeting()}, {userData?.name || "Coder"} 👋
            </h2>
            <p className="text-gray-400">
              Your personal coding practice center
            </p>
          </div>

          {/* <div className="ml-auto flex items-center gap-2 bg-indigo-600/20 px-4 py-2 rounded-full text-sm font-semibold">
            <FaFire className="text-orange-400" />
            Streak Active
          </div> */}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Problems Solved",
            value: solvedCount,
            glow: "from-green-400 to-emerald-600",
          },
          {
            title: "Total Submissions",
            value: history.length,
            glow: "from-blue-400 to-indigo-600",
          },
          {
            title: "Time Spent",
            value: formatTimeFromSeconds(totalTime),
            glow: "from-purple-400 to-pink-600",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative overflow-hidden rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-20`}
            />
            <p className="text-gray-400 mb-1">{item.title}</p>
            <p className="text-4xl font-extrabold">{item.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto text-center mb-14">
        <motion.button
          onClick={() => (window.location.href = "/questions")}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-indigo-500/40 transition"
        >
          ⚡ Enter Practice Arena
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-5">Recent Submissions</h3>

        {history.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center text-gray-400">
            No activity yet. Start solving to build momentum 🚀
          </div>
        ) : (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {history.map((sub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * idx }}
                className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {sub?.questionId?.title || "Unknown Problem"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        sub.status === "solved"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {sub.status}
                    </span>{" "}
                    | Time: {formatTimeInSeconds(sub.timeTaken)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(sub.submittedAt).toLocaleString()}
                  </p>
                </div>

                <a
                  href="/submission"
                  className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl text-sm font-semibold transition"
                >
                  View
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl border border-white/10 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm logout?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
