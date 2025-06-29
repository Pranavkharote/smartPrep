import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../assets/Loader";
import DarkModeToggle from "../components/ThemeToggle";
import "../index.css"
import "@theme-toggles/react/css/Expand.css"
import { Expand } from "@theme-toggles/react"

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name")

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/submission-history",
          {
            withCredentials: true,
          }
        );
        setHistory(res.data.submission);
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
    (sum, item) => sum + (typeof item.timeTaken === "number" ? item.timeTaken: 0),
    0
  );
  
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };
  const solvedCount = history.filter((item) => item.status == "solved").length;
  console.log(history);
  // Inspect the first few items
history.slice(0, 5).forEach((item, i) => {
  console.log(`Item ${i}: timeTaken =`, item.timeTaken);
});
// What is the average timeTaken?
const averageTime = history.reduce((sum, i) => sum + (i.timeTaken || 0), 0) / history.length;
console.log('Average timeTaken =', averageTime);
// Check how many items
console.log('history length:', history.length);

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
{/* <Expand duration={750}  /> */}
    <DarkModeToggle/>
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
          👋 Welcome back, {name || "Coder"}!
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Keep pushing boundaries. You're doing amazing!
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
              value: history.length || 0,
              color: "text-blue-600",
            },
            {
              title: "Time Spent (mins)",
              value: formatTime(totalTime) || 0,
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
          <h2 className="text-2xl  mb-4">
            📝 Recent Submissions
          </h2>
          {history.length === 0 ? (
            <p className="">No submissions yet. Start solving!</p>
          ) : (
            <div className="space-y-4 ">
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
                      | Time: {sub.timeTaken}
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
      </motion.div>
    </div>
  );
};

export default Dashboard;
