import React from "react";
import { useOutletContext } from "react-router-dom";

const Solution = () => {
  const question = useOutletContext();
  return (
    <div className=" lg:w-1/2 my-10  ps-3 h-[200px]  p-2">
      <p className="text-lg font-bold mb-3">{question.title}</p>
      
      <code className="text-sm bg-gray-500 gap-7 rounded">{question.solution}</code>

      {question.youtubeSolutionURL && (
        <div className="mt-4">
          <p className="text-sm text-red-500 mb-2">
            ⚠️ This video can't be embedded. Click below to watch on YouTube.
          </p>
          <a
            href={question.youtubeSolutionURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            ▶️ Watch Solution on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default Solution;
