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

    try {
      const result = await submitCode({
        source_code: submittedCode,
        language_id: 54, // use selected language
        stdin: "",
      });

      setRunning(false);

      if (!result) {
        setOutput("Failed to run code. Try again.");
        return;
      }

      const decode = (str) => {
        try {
          return str ? atob(str) : "";
        } catch {
          return str || "";
        }
      };

      const sanitizeOutput = (str) => {
        if (!str) return "";
        return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
      };

      if (result.stdout) {
        const decoded = decode(result.stdout);
        console.log("Decoded stdout:", decoded);
        setOutput(sanitizeOutput(decoded));
      } else if (result.stderr) {
        const decoded = decode(result.stderr);
        console.error("Decoded stderr:", decoded);
        setOutput(sanitizeOutput(decoded));
      } else if (result.compile_output) {
        const decoded = decode(result.compile_output);
        console.error("Decoded compile_output:", decoded);
        setOutput(sanitizeOutput(decoded));
      } else {
        setOutput("No output from program.");
      }
    } catch (error) {
      setRunning(false);
      toast.error("Error running code. Try again.");
      console.error(error);
    }
  };

  //   const runCode = async () => {
  //   if (!languageId) {
  //     toast.error("Please select a programming language.");
  //     return;
  //   }
  //   if (!submittedCode.trim()) {
  //     toast.error("Please enter code to run.");
  //     return;
  //   }

  //   setRunning(true);
  //   setOutput("Running...");

  //   const result = await submitCode({
  //     source_code: submittedCode,
  //     language_id: 63,
  //     stdin: "", // Extend for user input later
  //   });

  //   setRunning(false);

  //   if (!result) {
  //     setOutput("Failed to run code. Try again.");
  //     return;
  //   }

  //   // base64_encoded must be true if backend is encoding output
  //   const decode = (str) => {
  //     try {
  //       return str ? atob(str) : "";
  //     } catch {
  //       return str || "";
  //     }
  //   };

  //   if (result.stdout) {
  //     setOutput(decode(result.stdout));
  //   } else if (result.stderr) {
  //     setOutput(decode(result.stderr));
  //   } else if (result.compile_output) {
  //     setOutput(decode(result.compile_output));
  //   } else {
  //     setOutput("No output from program.");
  //   }
  // };

  // const runCode = async () => {
  //   if (!languageId) {
  //     toast.error("Please select a programming language.");
  //     return;
  //   }
  //   if (!submittedCode.trim()) {
  //     toast.error("Please enter code to run.");
  //     return;
  //   }

  //   setRunning(true);
  //   setOutput("Running...");

  //   const result = await submitCode({
  //     source_code: submittedCode,
  //     language_id: 63,
  //     stdin: "", // You can add input handling later
  //   });

  //   setRunning(false);

  //   if (!result) {
  //     setOutput("Failed to run code. Try again.");
  //     return;
  //   }
  //   if (result?.stdout) {
  //     console.log("Output:", result.stdout);
  //   } else if (result?.stderr || result?.compile_output) {
  //     console.error("Error:", result.stderr || result.compile_output);
  //   } else {
  //     console.log("No output");
  //   }

  //   //   const decodedOutput = result.stdout
  //   // ? atob(result.stdout)
  //   // : result.stderr
  //   // ? atob(result.stderr)
  //   // : result.compile_output
  //   // ? atob(result.compile_output)
  //   // : "No output from program.";
  //   // if (result.stdout) setOutput(result.stdout);
  //   // else if (result.stderr) setOutput(result.stderr);
  //   // else if (result.compile_output) setOutput(result.compile_output);
  //   // else setOutput("No output from program.");

  //   setOutput();
  // };

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
