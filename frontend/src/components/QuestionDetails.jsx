import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const QuestionComponent = () => {
  const [question, setQuestion] = useState({});
  //second

  const { questionId } = useParams();
  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const questionDetails = await axios.get(
          `${BACKEND_URL}/questions/${questionId}`,
          { withCredentials: true }
        );
        setQuestion(questionDetails.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestionDetail();
  }, [questionId]);

  return (
    <>
  <div
    className="
      w-full lg:w-1/2 mt-10
      mb-6 p-4 sm:p-5 md:p-6 
      space-y-6 rounded-3xl border border-white/10 shadow-2xl
      max-h-[85vh] overflow-y-auto no-scrollbar
      bg-gradient-to-b from-[#0f0f1a] to-[#05050d]
      text-white
    "
  > 
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-wide">
        {question.title}
      </h1>

      <span
        className={`w-fit shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide
          ${
            question.difficulty === "Easy"
              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black"
              : question.difficulty === "Hard"
              ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
          }`}
      >
        {question.difficulty}
      </span>
    </div>
 
    <div>
      <h3 className="font-bold text-base sm:text-lg mb-2 text-cyan-400">
        Problem Statement
      </h3>
      <p className="leading-relaxed text-sm sm:text-base text-gray-300">
        {question.description}
      </p>
    </div>
 
    {question.tags?.length > 0 && (
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-2 text-purple-400">
          Topics
        </h3>

        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="
                px-3 py-1 rounded-full text-xs font-bold tracking-wide
                bg-white/5 border border-white/15 text-blue-300
                shadow-sm
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )}
 
    {question.stepByStepGuide?.length > 0 && (
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-2 text-green-400">
          Step-by-Step Guide
        </h3>

        <ol className="space-y-2 list-decimal list-inside text-sm sm:text-base text-gray-300">
          {question.stepByStepGuide.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    )}
 
    {question.constraints && (
      <div
        className="
          rounded-xl p-3 sm:p-4 text-xs sm:text-sm font-mono
          overflow-x-auto
          bg-black/50 border border-white/10 text-gray-200
        "
      >
        <strong className="block mb-1 font-semibold text-yellow-400">
          Constraints
        </strong>
        {question.constraints}
      </div>
    )}
 
    {question.testCases?.length > 0 && (
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-3 text-pink-400">
          Test Cases
        </h3>

        <div className="space-y-4">
          {question.testCases.map((testCase, index) => (
            <div
              key={index}
              className="
                rounded-2xl p-4 border border-white/10 shadow-lg
                bg-black/40
              "
            >
              <p className="font-semibold mb-2 text-sm sm:text-base text-cyan-300">
                Test Case {index + 1}
              </p>

              <div className="text-xs sm:text-sm space-y-1 text-gray-300 break-words font-mono">
                <p>
                  <strong className="text-yellow-400">Input:</strong>{" "}
                  {Array.isArray(testCase.input)
                    ? `[${testCase.input.join(", ")}]`
                    : typeof testCase.input === "object"
                    ? Object.entries(testCase.input)
                        .map(
                          ([key, value]) =>
                            `${key}: ${
                              Array.isArray(value)
                                ? `[${value.join(", ")}]`
                                : value
                            }`
                        )
                        .join(", ")
                    : testCase.input}
                </p>

                <p>
                  <strong className="text-green-400">Expected Output:</strong>{" "}
                  {Array.isArray(testCase.expectedOutput)
                    ? `[${testCase.expectedOutput.join(", ")}]`
                    : typeof testCase.expectedOutput === "object"
                    ? JSON.stringify(testCase.expectedOutput)
                    : testCase.expectedOutput}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</>

  );
};

export default QuestionComponent;
