import QuestionList from "./components/QuestionList";
import Login from "./pages/Login";
import MainQuestionEditorComponent from "./components/MainQuestionEditorComponent";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Hi from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";
import SubmissionHistory from "./components/SubmissionHistory";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  // const [languageId, setLanguageId] = useState(null);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <QuestionList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/questions/:questionId"
        element={
          <ProtectedRoute>
            <MainQuestionEditorComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submission"
        element={
          <ProtectedRoute>
            <SubmissionHistory />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
