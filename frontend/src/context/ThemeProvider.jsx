// import { createContext, useState, useEffect } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   const toggleTheme = () => setDarkMode((prev) => !prev);

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
