import React from "react";
import QuestionComponent from "./QuestionDetails";
import EditorSide from "./EditorSide";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import Example from "./MainNavbar";
import MainNavbar from "./MainNavbar";
import LeftNavbar from "./LeftNavbar";
import { Outlet } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const MainQuestionEditorComponent = () => {
  const [question, setQuestion] = useState({});
  //second
  const { questionId } = useParams();
  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const questionDetails = await axios.get(
          // `http://localhost:8080/questions/${questionId}`,
          `${BACKEND_URL}/questions/${questionId}`,
          { withCredentials: true }
        );
        setQuestion(questionDetails.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestionDetail();
  }, [questionId]);
  return (
    <div className="overflow-hidden h-screen  ">
      <MainNavbar />
      {/* <div className="w-64 fixed top-16 bottom-0 left-0 z-40 bg-red-300 border-r"> */}
      <LeftNavbar />
      {/* </div> */}
      <div className="flex flex-col lg:flex-row h-screen   gap-4 overflow-hidden ">
        <Outlet context={question}/>
        <EditorSide question={question} />
      </div>
    </div>
  );
};

export default MainQuestionEditorComponent;
