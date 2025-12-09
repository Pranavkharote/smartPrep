import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarFilter from "./NavbarFilter"; // the new UI version of NavbarFilter
import DarkModeToggle from "./ThemeToggle";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
};

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: "",
    tags: [],
    search: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:8080/questions",
          `${BACKEND_URL}/questions`,
           {
          withCredentials: true,
        });
        setQuestions(res.data || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

   
  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty =
      !filters.difficulty || q.difficulty === filters.difficulty;
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => q.tags.includes(tag));
    const matchesSearch = filters.search
      ? q.title.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchesDifficulty && matchesTags && matchesSearch;
  });

  return (
 <div
  className="
    min-h-screen p-4 md:p-8 transition-colors
    bg-gradient-to-br from-[#0f0f1a] via-[#080812] to-[#05050d]
    text-white
  "
>
   
  <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">

    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate("/")}
        className="
          px-4 py-2 rounded-xl text-sm font-semibold transition
          bg-gradient-to-r from-red-500 to-pink-600
          hover:scale-105 shadow-lg
        "
      >
        ← Back
      </button>
    </div>

    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-cyan-400">
      📚 Question Bank
    </h1>

    <div className="w-24" />  
  </div>

   
  <div className="max-w-7xl mx-auto mb-10">
    <div
      className="
        bg-black/40 border border-white/10 rounded-2xl p-4 shadow-xl
        backdrop-blur-xl
      "
    >
      <NavbarFilter onFilterChange={setFilters} />
    </div>
  </div>
 
  <div className="max-w-6xl mx-auto grid gap-5">

    {filteredQuestions.length === 0 ? (
      <div
        className="
          text-center py-16 rounded-3xl
          bg-black/40 border border-white/10 text-gray-400
        "
      >
        No questions match the selected filters.
      </div>
    ) : (
      filteredQuestions.map((question, index) => (
        <motion.div
          key={question._id}
          onClick={() => navigate(`/questions/${question._id}`)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="
            cursor-pointer rounded-2xl p-6 transition-all duration-200
            bg-gradient-to-b from-[#0f0f1a] to-[#05050d]
            border border-white/10 shadow-xl
            hover:shadow-2xl hover:-translate-y-0.5
          "
        > 
          <div className="flex justify-between items-center mb-3 gap-4">
            <h2 className="text-lg md:text-xl font-bold leading-snug text-white">
              {index + 1}. {question.title}
            </h2>

            <span
              className={`shrink-0 px-3 py-1 rounded-full text-xs md:text-sm font-bold tracking-wide
                ${
                  question.difficulty === "Easy"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black"
                    : question.difficulty === "Hard"
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                }
              `}
            >
              {question.difficulty}
            </span>
          </div>
 
          <p className="text-sm md:text-base mb-3 line-clamp-2 text-gray-300">
            {question.description}
          </p>
 
          <div className="flex gap-2 flex-wrap mt-2">
            {question.tags?.map((tag, i) => (
              <span
                key={i}
                className="
                  text-xs font-bold px-2.5 py-1 rounded-full
                  bg-white/5 border border-white/10 text-blue-300
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))
    )}

  </div>
</div>


  );
};

export default QuestionList;
