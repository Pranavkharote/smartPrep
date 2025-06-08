import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmissionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return <p className="p-4">Loading submission history...</p>;
  }

  if (history.length === 0) {
    return <p className="p-4">No submissions yet.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📜 Submission History
      </h1>

      <div className="space-y-6">
        {history.length === 0 ? (
          <p className="text-center text-gray-600">No submissions found yet.</p>
        ) : (
          history.map((sub, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  {sub.questionId?.title || "Untitled Question"}
                </h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    sub.status === "solved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {sub.status}
                </span>
              </div>

              <div className="text-gray-700 space-y-1 mb-4">
                <p>
                  ⏱ <strong>Time Taken:</strong> {sub.timeTaken} sec
                </p>
                <p>
                  📅 <strong>Submitted At:</strong>{" "}
                  {new Date(sub.submittedAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="font-medium mb-1">🧠 Submitted Code:</p>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm leading-relaxed">
                  {sub.submittedCode}
                </pre>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => navigate(`/questions/${sub.questionId?._id}`)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md font-semibold"
                >
                  🔁 Re-Attempt
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    // <div className="p-6">
    //   <h2 className="text-2xl font-bold mb-4">Submission History</h2>
    //   {history.map((entry, index) => (
    //     <div
    //       key={index}
    //       className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow"
    //     >
    //       <p><strong>UserId:</strong> {entry.questionId?._id || "not"}</p>
    //       <p><strong>Question:</strong> {entry.questionId?.title || "Unknown"}</p>
    //       <p><strong>Status:</strong> {entry.status}</p>
    //       <p><strong>Time Taken:</strong> {entry.timeTaken} sec</p>
    //       <p><strong>Submitted At:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
    //       <div className="mt-2">
    //         <p className="font-semibold">Submitted Code:</p>
    //         <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
    //           {entry.submittedCode}
    //         </pre>
    //       </div>
    //       <button className="bg-red-300 px-2 rounded-2xl"><a href={`/questions/${entry.questionId?._id}`}>ReAttempt</a></button>
    //     </div>
    //   ))}
    // </div>
  );
};

export default SubmissionHistory;
