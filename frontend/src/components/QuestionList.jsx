// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const QuestionList = () => {
//   const [question, setQuestion] = useState([]);
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const QuestionRes = await axios.get("http://localhost:8080/questions");
//         setQuestion(QuestionRes.data);
//         // console.log(QuestionRes.data);
//       } catch (err) {
//         console.log("Question error", err);
//       }
//     };
//     fetchQuestions();
//   }, []);
//   return (
//     <>
//       <h2>All Questions</h2>
//       {question.length === 0 ? (
//         <p>No question found</p>
//       ) : (
//         <ul>
//           {question.map((q) => {
//             return (
//               <div className="bg-green-300 m-2">
//                 <Link to={`/questions/${q._id}`}>
//                   <li
//                     key={q._id}
//                     style={{
//                       cursor: "pointer",
//                       border: "1px solid #ddd",
//                       padding: "10px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <strong>{q.title}</strong>
//                     <em> {q.difficulty}</em>
//                   </li>
//                 </Link>
//               </div>
//             );
//           })}
//         </ul>
//       )}
//     </>
//   );
// };

// export default QuestionList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
};

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:8080/questions", {
          withCredentials: true,
        });
        setQuestions(res.data || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <motion.h1
        className="text-3xl font-bold text-center text-blue-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📚 Question Bank
      </motion.h1>

      <div className="max-w-5xl mx-auto grid gap-5">
        {questions.length === 0 ? (
          <p className="text-center text-gray-600">No questions found.</p>
        ) : (
          questions.map((question, index) => (
            <motion.div
              key={question._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => navigate(`/questions/${question._id}`)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {question.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    difficultyColors[question.difficulty] || "bg-gray-200"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {question.description.slice(0, 120)}...
              </p>
              <div className="flex gap-2 flex-wrap">
                {question.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionList;
