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
      {/* <LeftNavbar /> */}
      <div className="w-full lg:w-1/2 no-scrollbar overflow-y-auto mb-6 p-6  border border-slate-200 rounded-xl shadow-sm  space-y-4 questionDetails">
        {/* Title & Difficulty */}

        <strong className="text-2xl block mb-1 mt-3">{question.title}</strong>
        <i className="text-sm">
          {question.difficulty == "Easy" ? (
            <p className="text-green-600">Easy</p>
          ) : (
            <p className="text-yellow-600">Medium </p>
          )}
          {question.difficulty == "hard" ? (
            <p className="text-red-500">Hard</p>
          ) : (
            " "
          )}
        </i>

        {/* Problem Statement */}
        <div className="mt-4">
          <h3 className="font-semibold mb-1 ">Problem Statement</h3>
          <p className=" leading-relaxed">{question.description}</p>
        </div>

        {/* Topics */}
        {question.tags?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1 ">Topics</h3>
            <ul className="list-inside list-decimal space-y-1">
              {question.tags?.map((tag, index) => (
                <li key={index} className="">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step-by-Step Guide */}
        {question.stepByStepGuide?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1 ">Step-by-Step Guide</h3>
            <ol className="list-inside list-decimal space-y-1">
              {question.stepByStepGuide?.map((step, index) => (
                <li key={index} className="">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="mt-4">
        <strong className="font-medium">Constraints: </strong> <br></br>
          <code className="bg-gray-500 text-sm">
            {question.constraints}
          </code>
        </div>
       
        {/* Test Cases */}
       {question.testCases?.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Test Cases</h3>
    {question.testCases?.map((testCase, index) => (
      <div
        key={index}
        className="mb-3 p-3 bg-slate-50 border border-slate-200 testCases rounded-md text-sm"
      >
        <p className="font-medium mb-1">Test Case {index + 1}</p>

        {/* Input */}
        <p>
          <strong>Input:</strong>{" "}
          {Array.isArray(testCase.input)
            ? `[${testCase.input.join(", ")}]`
            : typeof testCase.input === "object"
            ? Object.entries(testCase.input)
                .map(
                  ([key, value]) =>
                    `${key}: ${Array.isArray(value) ? `[${value.join(", ")}]` : value}`
                )
                .join(", ")
            : testCase.input}
        </p>

        {/* Expected Output */}
        <p>
          <strong>Expected Output:</strong>{" "}
          {Array.isArray(testCase.expectedOutput)
            ? `[${testCase.expectedOutput.join(", ")}]`
            : typeof testCase.expectedOutput === "object"
            ? JSON.stringify(testCase.expectedOutput)
            : testCase.expectedOutput}
        </p>
      </div>
    ))}
  </div>
)}

      </div>
    </>
  );
};

export default QuestionComponent;
