import React from "react";
import { useOutletContext } from "react-router-dom";

const Solution = () => {
  const question = useOutletContext();
  return (
   <div className="lg:w-1/2 my-10 ps-3 h-[200px] p-2">
  
  {/* ✅ Title */}
  <p className="text-lg font-bold mb-3 text-cyan-400 tracking-wide">
    {question.title}
  </p>

  {/* ✅ Solution Code */}
  <pre
    className="
      text-sm 
      bg-black/70 
      text-green-400 
      p-4 
      rounded-xl 
      border border-green-500/20 
      shadow-inner 
      overflow-x-auto
      leading-relaxed
    "
  >
    {question.solution}
  </pre>
 
  {question.youtubeSolutionURL && (
    <div className="mt-4">
      <p className="text-sm text-yellow-400 mb-2">
        ⚠️ This video can’t be embedded. Click below to watch on YouTube.
      </p>

      <a
        href={question.youtubeSolutionURL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block 
          bg-gradient-to-r from-red-500 to-pink-600 
          text-white 
          px-4 py-2 
          rounded-full 
          font-semibold 
          hover:scale-105 transition 
          shadow-lg
        "
      >
        ▶️ Watch Solution on YouTube
      </a>
    </div>
  )}
</div>

  );
};

export default Solution;
