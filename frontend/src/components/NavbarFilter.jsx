import { useState } from "react";
import { useEffect } from "react";
const difficulties = ["Easy", "Medium", "Hard"];
const topics = [
  "Array",
  "String",
  "Math",
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
   <nav className="
  bg-gradient-to-r from-[#0f0f1a] to-[#05050d]
  shadow-xl p-4 rounded-2xl 
  border border-white/10 
  flex flex-col gap-4 md:flex-row md:items-center md:justify-between 
  transition-all duration-200
">
  
  {/* ✅ Difficulty */}
  <div className="flex items-center space-x-2">
    <span className="text-sm font-semibold text-gray-300">
      Difficulty:
    </span>

    <select
      className="
        rounded-md 
        border border-white/10 
        bg-black/50 
        text-gray-200 
        px-3 py-1 text-sm 
        shadow-inner 
        focus:outline-none 
        focus:ring-2 focus:ring-cyan-500 
        transition
      "
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

  {/* ✅ Search */}
  <div className="flex items-center space-x-2 w-full md:w-1/5">
    <input
      type="text"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="
        flex-1 
        rounded-md 
        border border-white/10 
        bg-black/50 
        text-gray-200 
        px-3 py-1 text-sm 
        shadow-inner 
        focus:outline-none 
        focus:ring-2 focus:ring-purple-500 
        transition
        placeholder:text-gray-500
      "
    />
  </div>

  {/* ✅ Topics */}
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-sm font-semibold text-gray-300">
      Topics:
    </span>

    {topics.map((topic) => {
      const active = selectedTags.includes(topic);

      return (
        <button
          key={topic}
          type="button"
          onClick={() => handleTagToggle(topic)}
          className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition
            ${
              active
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-600 text-white shadow-lg"
                : "bg-black/40 border-white/10 text-gray-300 hover:border-blue-400 hover:text-blue-400"
            }
          `}
        >
          {topic}
        </button>
      );
    })}
  </div>

</nav>

  );
}
