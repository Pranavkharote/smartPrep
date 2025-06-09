import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Dashboard = ({ user = {}, stats = {} }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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
      }
    };
    fetchHistory();
  }, []);
  if (loading) {
    return <p>Loading Dashboard...</p>;
  }
  const totalTime = history.reduce(
    (sum, item) => sum + (item.timeTaken || 0),
    0
  );

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
    // return `${hrs}h ${mins}m ${secs}s`;
  };

  const solvedCount = history.filter((item) => item.status == "solved").length;
  console.log(history);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-blue-800 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          👋 Welcome back, {user.name || "Coder"}!
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
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
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
            >
              <h2 className="text-lg text-gray-500 mb-1">{item.title}</h2>
              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Submissions */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📝 Recent Submissions
          </h2>
          {history.length === 0 ? (
            <p className="text-gray-500">No submissions yet. Start solving!</p>
          ) : (
            <div className="space-y-4">
              {history.map((sub, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {sub?.questionId?.title || "unknown"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          sub.status === "solved"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {sub.status}
                      </span>{" "}
                      | Time: {sub.timeTaken}s
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm font-medium">
                    <a href="/submission">View</a>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
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
      </motion.div>
    </div>
  );
};

export default Dashboard;
