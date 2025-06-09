import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { submitCode } from "../api/Judge0";

import CodeEditor from "./CodeEditor";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const EditorSide = () => {
  const [status, setStatus] = useState("attempted");
  const [timeStart, setTimeStart] = useState(Date.now());
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [languageId, setLanguageId] = useState(54);

  const { questionId } = useParams();

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
    });
  };
  const handleError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeTaken = Math.floor((Date.now() - timeStart) / 1000);

    const payload = {
      questionId: questionId,
      status: "solved",
      timeTaken: timeTaken,
      submittedCode: submittedCode,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8080/submission",
        payload,
        { withCredentials: true }
      );

      const { success, message } = data;
      console.log(message);
      if (success == true || success == "true") {
        console.log("code sent");
        handleSuccess(message);
        setTimeStart(Date.now());
        setStatus("solved");
        setSubmittedCode("");
      } else {
        handleError(message);
        console.log(message);
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
      console.log(err.response?.data || err.message);
    }
  };

  const runCode = async () => {
    if (!languageId) {
      toast.error("Please select a programming language.");
      return;
    }
    if (!submittedCode.trim()) {
      toast.error("Please enter code to run.");
      return;
    }

    setRunning(true);
    setOutput("Running...");

    const testCases = question.testCases || [];
    if (testCases.length === 0) {
      setOutput("No test cases available.");
      setRunning(false);
      return;
    }

    const wrapCodeWithTests = (submittedCode, question) => {
      const { functionName, testCases } = question;

      return `
${submittedCode}

// Test Cases
const testCases = ${JSON.stringify(testCases)};
testCases.forEach((test, index) => {
  try {
    const result = ${functionName}(...test.input);
    const expected = test.expectedOutput;
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    if (passed) {
      console.log(\`✅ Test Case \${index + 1}: Passed\`);
    } else {
      console.log(\`❌ Test Case \${index + 1}: Failed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
    }
  } catch (e) {
    console.log(\`❌ Test Case \${index + 1}: Crashed - \${e.message}\`);
  }
});
`;
    };

    let allPassed = true;
    let results = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const stdin = testCase.input || "";
      const expectedOutput = testCase.expectedOutput || "";

      const wrappedCode = wrapCodeWithTests(submittedCode, question);

      try {
        const result = await submitCode({
          source_code: wrappedCode,
          language_id: languageId,
          // stdin: stdin,
        });
        const output = decode(result.stdout);
        setOutput(output);

        const decode = (str) => {
          try {
            return str
              ? new TextDecoder().decode(
                  Uint8Array.from(atob(str), (c) => c.charCodeAt(0))
                )
              : "";
          } catch (err) {
            return str || "";
          }
        };

        const sanitizeOutput = (str) => {
          if (!str) return "";
          return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
        };

        const actualOutput = sanitizeOutput(decode(result.stdout)).trim();
        const stderr = sanitizeOutput(decode(result.stderr)).trim();
        const compileOutput = sanitizeOutput(
          decode(result.compile_output)
        ).trim();

        if (stderr) {
          results.push(`Test Case ${i + 1}: ⚠️ Runtime Error:\n${stderr}`);
          allPassed = false;
        } else if (compileOutput) {
          results.push(
            `Test Case ${i + 1}: 🛠️ Compile Error:\n${compileOutput}`
          );
          allPassed = false;
        } else if (actualOutput === expectedOutput) {
          results.push(`Test Case ${i + 1}: ✅ Passed`);
        } else {
          results.push(
            `Test Case ${
              i + 1
            }: ❌ Failed\nExpected: ${expectedOutput}\nGot: ${actualOutput}`
          );
          allPassed = false;
        }
      } catch (error) {
        results.push(`Test Case ${i + 1}: Error running code.`);
        allPassed = false;
      }
    }

    setOutput(results.join("\n\n"));
    setRunning(false);
  };

  return (
    <div className="w-1/2">
      <select
        value={languageId}
        onChange={(e) => setLanguageId(parseInt(e.target.value))}
        className="mb-2 p-2 border rounded"
      >
        <option value={62}>Java</option>
        <option value={54}>JavaScript</option>
        <option value={71}>Python</option>
        <option value={63}>C++</option>
        {/* Add more languages as needed */}
      </select>
      <form onSubmit={handleSubmit}>
        <CodeEditor code={submittedCode} setCode={setSubmittedCode} />
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={runCode}
            disabled={running}
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {running ? "Running..." : "Run Code"}
          </button>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Submit Code
          </button>
        </div>

        {output && (
          <pre
            className="mt-4 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {output}
          </pre>
        )}
      </form>
    </div>
  );
};

export default EditorSide;
