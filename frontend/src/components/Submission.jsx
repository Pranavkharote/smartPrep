import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CopyCode from "./CopyCode";

const Submission = () => {
  const [history, setHistory] = useState([]);
  // const navigate = useNavigate();

  let { questionId } = useParams();
  console.log("qId: ", questionId);
  useEffect(() => {
    const submission = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/submission/${questionId}`,
          { withCredentials: true }
        );
        setHistory(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    submission();
  }, [questionId]);

  return (
    <div className="w-full lg:w-1/2 overflow-y-auto ps-3 my-10">
      {/* <div className="p-6 bg-gray-100 min-h-screen w-200px "> */}

        <div className="space-y-6">
          {history.length === 0 ? (
            <p className="text-center text-gray-600">
              No submissions found yet.
            </p>
          ) : (
            history.map((sub, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
              >
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      sub.status === "solved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
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
                    {/* {sub.submittedCode} */}
                  <CopyCode code={sub.submittedCode}/>
                  </pre>
                </div>

              
              </div>
            ))
          )}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Submission;
