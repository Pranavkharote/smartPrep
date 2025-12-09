import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import CopyCode from "./CopyCode";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const Submission = () => {
  const [history, setHistory] = useState([]);
  // const navigate = useNavigate();

  let { questionId } = useParams();
  useEffect(() => { 
  const fetchSubmissions = async () => {
    const res = await axios.get(
      `${BACKEND_URL}/submission/${questionId}`,
      // `http://localhost:8080/submission/${questionId}`,
      { withCredentials: true}
    );
    const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setHistory(sorted);
  };

  fetchSubmissions();
}, [questionId]);

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

  return (
  <div className="w-full lg:w-1/2 overflow-y-auto ps-3 my-10">
  <div className="space-y-6">

    {history.length === 0 ? (
      <p className="text-center text-gray-400">
        No submissions found yet.
      </p>
    ) : (
      history.map((sub, index) => (
        <div
          key={index}
          className="
            bg-gradient-to-b from-[#0f0f1a] to-[#05050d]
            shadow-2xl rounded-2xl p-6 
            border border-white/10
          "
        >
          {/* ✅ Status */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <span
              className={`px-3 py-1 text-sm rounded-full font-semibold tracking-wide
                ${
                  sub.status === "solved"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                }`}
            >
              {sub.status}
            </span>
          </div>

          {/* ✅ Meta Info */}
          <div className="text-gray-300 space-y-1 mb-4 text-sm">
            <p>
              ⏱ <strong className="text-cyan-400">Time Taken:</strong>{" "}
              {formatTime(sub.timeTaken)}
            </p>
            <p>
              💻 <strong className="text-purple-400">Language:</strong>{" "}
              {sub.language}
            </p>
            <p>
              📅 <strong className="text-yellow-400">Submitted At:</strong>{" "}
              {new Date(sub.submittedAt).toLocaleString()}
            </p>
          </div>

          {/* ✅ Code Block */}
          <div>
            <p className="font-semibold mb-2 text-pink-400">
              🧠 Submitted Code:
            </p>

            <pre className="
              bg-black/70 text-green-400 
              p-4 rounded-xl 
              overflow-x-auto text-sm 
              leading-relaxed 
              border border-green-500/20
              shadow-inner
            ">
              <CopyCode code={sub.submittedCode} />
            </pre>
          </div>
        </div>
      ))
    )}

  </div>
</div>

  );
};

export default Submission;
