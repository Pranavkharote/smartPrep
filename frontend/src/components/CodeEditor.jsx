import React, { useState } from "react";
import AceEditor from "react-ace";

// Import modes and themes you want
import "ace-builds/src-noconflict/mode-javascript"; // or mode-cpp, mode-java etc
import "ace-builds/src-noconflict/theme-github"; // choose a theme

const CodeEditor = ({ code, setCode }) => {
  return (
    <AceEditor
      mode="javascript" // change mode dynamically based on question language later
      theme="abyss"
      name="code_editor"
      value={code}
      onChange={setCode}
      fontSize={14}
      width="100%"
      height="300px"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
};

export default CodeEditor;
