import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
import DarkModeToggle from "../components/ThemeToggle";
import Loader from "../assets/Loader";

const SubmissionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:8080/submission-history",
          `${BACKEND_URL}/submission-history`,
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

  if (history.length === 0) {
    return <p className="p-4">No submissions yet.</p>;
  }

  return (
    <div
      className="p-6 min-h-screen 
                bg-gradient-to-br from-[#0f0f1a] via-[#080812] to-[#05050d] 
                text-white"
    >
      <DarkModeToggle />

      <h1
        className="text-3xl font-extrabold mb-10 text-center 
                 bg-gradient-to-r from-cyan-400 to-purple-500 
                 bg-clip-text text-transparent"
      >
        📜 Submission History
      </h1>

      <div className="space-y-6">
        {history.length === 0 ? (
          <p className="text-center text-gray-400">No submissions found yet.</p>
        ) : (
          history.map((sub, index) => (
            <div
              key={index}
              className="
            bg-black/40 border border-white/10 
            shadow-2xl rounded-2xl p-6
          "
            >
              {/* ✅ TITLE + STATUS */}
              <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-cyan-400">
                  {sub.questionId?.title || "Untitled Question"}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-bold tracking-wide
                ${
                  sub.status === "solved"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                }`}
                >
                  {sub.status}
                </span>
              </div>

              {/* ✅ META INFO */}
              <div className="space-y-1 mb-4 text-gray-300 text-sm">
                <p>
                  ⏱ <strong className="text-cyan-400">Time Taken:</strong>{" "}
                  {sub.timeTaken} sec
                </p>
                <p>
                  📅 <strong className="text-purple-400">Submitted At:</strong>{" "}
                  {new Date(sub.submittedAt).toLocaleString()}
                </p>
              </div>

              {/* ✅ CODE */}
              <div>
                <p className="font-semibold mb-2 text-pink-400">
                  🧠 Submitted Code:
                </p>
                <pre
                  className="
                bg-black/70 text-green-400 
                p-4 rounded-xl 
                border border-green-500/20 
                shadow-inner 
                overflow-x-auto text-sm leading-relaxed
              "
                >
                  {sub.submittedCode}
                </pre>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => navigate(`/questions/${sub.questionId?._id}`)}
                  className="
                bg-gradient-to-r from-red-500 to-pink-600 
                text-white px-5 py-2 rounded-full 
                font-semibold shadow-lg 
                hover:scale-105 transition
              "
                >
                  🔁 Re-Attempt
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubmissionHistory;
