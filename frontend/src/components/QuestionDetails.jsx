import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Example from "./LeftNavbar";
import LeftNavbar from "./LeftNavbar";

const QuestionComponent = () => {
  const [question, setQuestion] = useState({});
  //second

  const { questionId } = useParams();
  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const questionDetails = await axios.get(
          `http://localhost:8080/questions/${questionId}`,
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
      <div className="w-full lg:w-1/2 overflow-y-auto mb-17 ps-3">
        <h2 className="text-xl font-semibold mb-2">Question Details</h2>
        <strong className="text-2xl">{question.title}</strong>
        <i className="mt-1 flex">{question.difficulty}</i>
        <div className="mt-2">
          <strong>Problem Statement:</strong>
          <p>{question.description}</p>
        </div>
        {/* <p className="mt-2">
            <strong>Solution:</strong>{" "}
            <code className="text-sm bg-gray-100 p-1 rounded">
              {question.solution}
            </code>
          </p> */}

        <div className="mt-4">
          <h3 className="font-bold mb-2">Topics</h3>
          {question.tags?.map((tag, index) => (
            <p key={index}>
              {index + 1}. {tag}
            </p>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Step-by-Step Guide:</h3>
          {question.stepByStepGuide?.map((step, index) => (
            <p key={index}>
              {index + 1}. {step}
            </p>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Test Cases:</h3>
          {question.testCases?.map((testCase, index) => (
            <div key={index} className="mb-2 bg-gray-200 p-3 rounded-md">
              <p>
                <strong>Test Case {index + 1}:</strong>
              </p>
              <p>
                <strong>Input:</strong> {JSON.stringify(testCase.input)}
              </p>
              <p>
                <strong>Expected Output:</strong>{" "}
                {JSON.stringify(testCase.expectedOutput)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionComponent;
