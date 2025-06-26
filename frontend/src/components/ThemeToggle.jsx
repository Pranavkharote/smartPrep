// src/components/DarkModeToggle.jsx
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button  className="absolute right-3 top-3 "
      onClick={() => setIsDarkMode(!isDarkMode)}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
    >
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
