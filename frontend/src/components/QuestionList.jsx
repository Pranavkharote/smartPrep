import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarFilter from "./NavbarFilter"; // the new UI version of NavbarFilter
import DarkModeToggle from "./ThemeToggle";

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
        const res = await axios.get("http://localhost:8080/questions", {
          withCredentials: true,
        });
        setQuestions(res.data || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Filtering logic
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 md:p-8 qlist">
      {/* Top bar with back button */}
      <DarkModeToggle />
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-4 py-1 rounded-full shadow hover:bg-red-600 transition"
        >
          ← Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 text-center flex-1 mx-4">
          📚 Question Bank
        </h1>
      </div>

      {/* Filter navbar */}
      <NavbarFilter onFilterChange={setFilters} />

      {/* Question list */}
      <div className="mt-8 max-w-5xl mx-auto grid gap-5">
        {filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-500">
            No questions match the selected filters.
          </p>
        ) : (
          filteredQuestions.map((question, index) => (
            <motion.div
              key={question._id}
              onClick={() => navigate(`/questions/${question._id}`)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {index + 1}. {question.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                    difficultyColors[question.difficulty] ||
                    "bg-gray-200 text-gray-800"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {question.description}
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                {question.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
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
