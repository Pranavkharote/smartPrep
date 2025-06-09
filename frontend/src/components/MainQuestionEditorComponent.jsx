import React from "react";
import QuestionComponent from "./QuestionDetails";
import EditorSide from "./EditorSide";

const MainQuestionEditorComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden p-5 gap-4">
      <QuestionComponent />
      <EditorSide />
    </div>
  );
};

export default MainQuestionEditorComponent;
