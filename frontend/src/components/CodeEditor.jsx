import React from "react";
import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";

import "ace-builds/src-noconflict/theme-twilight";

const CodeEditor = ({
  code,
  setCode,
  onCodeChange,
  languageMode = "javascript",
}) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
      <AceEditor
        mode={languageMode}
        theme="twilight"
        name="code_editor"
        value={code}
        onChange={(value) => {
          setCode(value);
          onCodeChange?.(value);
        }}
        fontSize={14}
        width="100%"
        height="320px"
        className="!bg-transparent"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showPrintMargin: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
