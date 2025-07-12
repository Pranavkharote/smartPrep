import QuestionList from "./components/QuestionList";
import Login from "./pages/Login";
import MainQuestionEditorComponent from "./components/MainQuestionEditorComponent";
import Signup from "./pages/Signup";
import { Routes, Route, Router } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SubmissionHistory from "./components/SubmissionHistory";
import Submission from "./components/Submission";
import QuestionComponent from "./components/QuestionDetails";
import Solution from "./components/Solution";
import ErrorBoundary from "./context/ErrorBoundaryforDashboard";
import ProtectedRoute from "./context/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<WelcomePage/>}/>
      {/* <Route element={<PublicRoute />}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          }
        />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/submission" element={<SubmissionHistory />} />
        <Route
          path="/questions/:questionId"
          element={<MainQuestionEditorComponent />}
        >
          <Route index element={<QuestionComponent />} />
          <Route path="submission" element={<Submission />} />
          <Route path="solution" element={<Solution />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
