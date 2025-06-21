import QuestionList from "./components/QuestionList";
import Login from "./pages/Login";
import MainQuestionEditorComponent from "./components/MainQuestionEditorComponent";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SubmissionHistory from "./components/SubmissionHistory";
import Submission from "./components/Submission";
import QuestionComponent from "./components/QuestionDetails";
import Solution from "./components/Solution";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <ErrorBoundary>/ */}
      <Route path="/" element={<Dashboard />} />
      {/* </ErrorBoundary> */}
      <Route path="/questions" element={<QuestionList />} />
      <Route
        path="/questions/:questionId"
        element={<MainQuestionEditorComponent />}
      />
      <Route path="/submission" element={<SubmissionHistory />} />
      <Route
        path="/questions/:questionId"
        element={<MainQuestionEditorComponent />}
      >
        <Route index element={<QuestionComponent />} />
        <Route path="submission" element={<Submission />} />
        <Route path="solution" element={<Solution />} />
      </Route>
    </Routes>
  );
};

export default App;
