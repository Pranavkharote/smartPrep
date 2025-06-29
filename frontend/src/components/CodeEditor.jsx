import React, { useState } from "react";
import AceEditor from "react-ace";
import "../index.css"
// Import modes and themes you want
import "ace-builds/src-noconflict/mode-javascript"; // or mode-cpp, mode-java etc
import "ace-builds/src-noconflict/theme-xcode"; // choose a theme

const CodeEditor = ({ code, setCode, languageMode = "javascript" }) => {
  return (
    <AceEditor
      mode={languageMode} // change mode dynamically based on question language later
      theme="xcode"
      name="code_editor"
      value={code}
      onChange={setCode}
      fontSize={14}
      width="100%"
      height="300px"
      className="aceEditor"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
};

export default CodeEditor;
