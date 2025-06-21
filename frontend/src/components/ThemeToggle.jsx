import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => setIsDarkMode((prev) => !prev);

  return (
    <nav className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-md p-4 rounded-xl flex items-center justify-between transition-colors duration-200">
      <span className="text-sm font-semibold">Dark Mode:</span>
      <button
        onClick={handleDarkModeToggle}
        className={`w-10 h-6 flex  items-center rounded-full p-1 transition-colors ${
          isDarkMode ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
            isDarkMode ? "translate-x-4" : ""
          }`}
        />
      </button>
    </nav>
  );
}
