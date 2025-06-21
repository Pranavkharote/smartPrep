import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="p-2 rounded text-white">
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
