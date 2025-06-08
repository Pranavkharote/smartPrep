import QuestionList from "./components/QuestionList";
import Login from "./pages/Login";
import QuestionDetail from "./components/QuestionDetail";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Hi from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";
import SubmissionHistory from "./components/SubmissionHistory";
// import CodeRunner from "./components/CodeRunner";
// import LanguageSelector from "./components/LanguageSelector";
// import { useState } from "react";
// import './testJudge0'
const App = () => {
  // const [languageId, setLanguageId] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/questions/:questionId" element={<QuestionDetail />} />
      <Route path="/submission" element={<SubmissionHistory />} />
    </Routes>
  );
};

export default App;
