import { useState } from "react";
import { useEffect } from "react";
const difficulties = ["Easy", "Medium", "Hard"];
const topics = [
  "Array",
  "String",
  "Tree",
  "Graph",
  "Dynamic Programming",
  "Hash Table",
  "Stack",
  "Two Pointer",
];

export default function NavbarFilter({ onFilterChange }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setSelectedDifficulty(value);
    onFilterChange({
      difficulty: value,
      tags: selectedTags,
      search: searchTerm,
    });
  };

  const handleTagToggle = (topic) => {
    const updatedTags = selectedTags.includes(topic)
      ? selectedTags.filter((t) => t !== topic)
      : [...selectedTags, topic];
    setSelectedTags(updatedTags);
    onFilterChange({
      difficulty: selectedDifficulty,
      tags: updatedTags,
      search: searchTerm,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({
      difficulty: selectedDifficulty,
      tags: selectedTags,
      search: value,
    });
  };

  return (
    <nav className="bg-gradient-to-r from-white to-slate-50 shadow-md p-4 rounded-xl border border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-all duration-200 navFilter">
      {/* Difficulty */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold ">
          Difficulty:
        </span>
        <select
          className="rounded-md border border-slate-300 bg-white text-slate-700 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          <option value="">All</option>
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 w-full md:w-1/5">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 rounded-md border border-slate-300 bg-white text-slate-700 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      {/* Topics */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-slate-700">Topics:</span>
        {topics.map((topic) => {
          const active = selectedTags.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => handleTagToggle(topic)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                active
                  ? "bg-blue-600 border-blue-600 text-white shadow"
                  : "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>
  
    </nav>
  );
}
