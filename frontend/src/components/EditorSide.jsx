import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { runCodeWithPiston } from "../api/Piston";
import "../index.css";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "./CodeEditor";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const EditorSide = ({ question }) => {
  const [status, setStatus] = useState("attempted");
  const [timeStart, setTimeStart] = useState(null);
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [languageId, setLanguageId] = useState(54);

  //AI
  const [showAI, setShowAI] = useState(false);
  // const [aiResponse, setAiResponce] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiChatInput, setAiChatInput] = useState("");
  const { questionId } = useParams();
  const [aiChatHistory, setAiChatHistory] = useState([]);

  const [formattedTime, setFormattedTime] = useState("00:00");
  const [timerRunning, setTimerRunning] = useState(false);
  // const [timeStart, setTimeStart] = useState(Date.now());

  useEffect(() => {
    if (question?.starterCode) {
      setSubmittedCode(question.starterCode);
    }
    if (question) {
      const code =
        question.starterCode || generateStarterCode(question.functionName);
      setSubmittedCode(code);
    }
  }, [question]);
  const generateStarterCode = (functionName) => {
    if (functionName === "twoSum") {
      return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var ${functionName} = function(nums, target) {

};`;
    }

    // Add more templates for other problems...
    return `function ${functionName}() {

}`;
  };

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
      status: "attempted",
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
      if (success === true || success === "true") {
        handleSuccess(message);
        setTimeStart(Date.now());
        setStatus("solved");
        setSubmittedCode("");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
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
    if (!question) {
      toast.error("Question not loaded yet.");
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

if (typeof ${functionName} !== "function") {
  console.log("error\\n❌ Function '${functionName}' is not defined properly.");
} else {
  const testCases = ${JSON.stringify(testCases)};
  testCases.forEach((test, index) => {
    try {
      const args = Object.values(test.input);
      const result = ${functionName}(...args);
      const expected = test.expectedOutput;
      const passed = JSON.stringify(result) === JSON.stringify(expected);
      if (passed) {
        console.log(\`✅ Test Case \${index + 1}: Passed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
      } else {
        console.log(\`❌ Test Case \${index + 1}: Failed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
      }
    } catch (e) {
      console.log(\`❌ Test Case \${index + 1}: Crashed - \${e.message}\`);
    }
  });
}
`;
    };

    const wrappedCode = wrapCodeWithTests(submittedCode, question);

    try {
      const result = await runCodeWithPiston({
        language: "javascript",
        // language: languageId === 62 ? "java" : languageId === 71 ? "python3" : languageId === 63 ? "cpp" : "javascript",
        code: wrappedCode,
      });

      console.log("🚀 Piston Result:", result);

      const output =
        result?.run?.stdout?.trim() ||
        result?.run?.stderr?.trim() ||
        result?.run?.output?.trim() ||
        "No output returned.";

      setOutput(output);
    } catch (error) {
      setOutput("❌ Error running code: " + (error.message || "Unknown error"));
    }

    setRunning(false);
  };

  //ai
  const handleAskAI = async (forcedPrompt = null) => {
    let rawPrompt = forcedPrompt || aiChatInput;
    // const promptToSend =
    //   typeof rawPrompt === "string"
    //     ? rawPrompt.trim()
    //     : String(rawPrompt).trim();
    // if (!promptToSend.trim()) return;

    const promptToSend = rawPrompt.trim();
    if (!promptToSend) return;

    if (typeof rawPrompt !== "string") {
      console.warn("Invalid prompt type. Got:", rawPrompt);
      return;
    }

    setAiChatInput("");
    setLoadingAI(true);
    setShowAI(true);
    try {
      const response = await axios.post("http://localhost:8080/ask", {
        prompt: promptToSend,
        questionTitle: question.title,
        questionDescription: question.description,
      });

      const aiAnswer = response.data.answer || "AI didn't respond";
      console.log("🧪 PromptToSend:", promptToSend, typeof promptToSend);
      console.log("🧪 AI Answer:", aiAnswer, typeof aiAnswer);

      setAiChatHistory((prev) => [
        ...prev,
        { user: String(promptToSend), ai: aiAnswer },
      ]);
    } catch (err) {
      setAiChatHistory((prev) => [
        ...prev,
        { user: promptToSend, ai: "Error to AI" },
      ]);
      console.log("AI error: ", err);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleQuickAsk = (textPrompt) => {
    if (typeof textPrompt === "string") {
      setAiChatInput(textPrompt);
      handleAskAI(textPrompt);
    }
  };

  useEffect(() => {
  if (!timerRunning) return;

  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - timeStart) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    setFormattedTime(`${minutes}:${seconds}`);
  }, 1000);

  return () => clearInterval(interval);
}, [timeStart, timerRunning]);


  return (
    <div className="w-1/2 py-2">
    <div className="flex">
      <select
        value={languageId}
        onChange={(e) => setLanguageId(parseInt(e.target.value))}
        className="mb-2 p-2 border rounded h-9 mr-5"
      >
        <option value={62}>Java</option>
        <option value={54}>JavaScript</option>
        <option value={71}>Python</option>
        <option value={63}>C++</option>
      </select>
      <div className="text-white bg-gray-800 p-3 rounded mb-3 w-fit flex gap-3 items-center h-10">
        ⏱ Time Spent: {formattedTime}
        {!timerRunning && (
          <button
            type="button"
            onClick={() => {
              setTimeStart(Date.now());
              setTimerRunning(true);
            }}
            className="text-sm bg-green-600 px-3 py-1 rounded hover:bg-green-700"
          >
            Start
          </button>
        )}
        {timerRunning && (
          <button
            type="button"
            onClick={() => setTimerRunning(false)}
            className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Stop
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setFormattedTime("00:00");
            setTimerRunning(false);
          }}
          className="text-sm bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
        >
          Reset
        </button>
      </div>
    </div>

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
          <button
            onClick={() => setShowAI(!showAI)}
            className="fixed bottom-5 right-5 bg-black text-white px-5 py-2 rounded-full shadow-2xl hover:bg-cyan-800 z-50"
          >
            🧠 Ask AI
          </button>

          <AnimatePresence />
          {showAI && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-15 right-4 w-[350px] bg-gray-700 text-white shadow-xl rounded-xl overflow-hidden z-50 flex flex-col"
            >
              <div className="p-4 border-b border-zinc-800 font-semibold flex justify-between items-center">
                <span>🧠 SmartPrep AI</span>
                <button
                  onClick={() => setShowAI(false)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <i class="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="py-2 px-4 space-y-3 text-sm">
                <button
                  onClick={() =>
                    handleQuickAsk("Can you explain the problem statement?")
                  }
                  className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition"
                >
                  ✨ Need help understanding the problem
                </button>

                <button
                  onClick={() =>
                    handleQuickAsk(
                      "What is the logic or approach to solve this problem?"
                    )
                  }
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition"
                >
                  🧠 Need help with logic / approach
                </button>
              </div>

              <div className="px-4 py-2 h-[266px] overflow-y-auto border-t border-zinc-800">
                {aiChatHistory.map((msg, index) => (
                  <div key={index} className="mb-3">
                    <p className="text-cyan-400 font-medium">
                      You: <span className="text-white">{msg.user}</span>
                    </p>
                    <p className="text-green-400">
                      AI: <span className="text-white">{msg.ai}</span>
                    </p>
                  </div>
                ))}
                {loadingAI && (
                  <p className="italic text-gray-500">AI is thinking...</p>
                )}
              </div>

              <div className="flex border-t border-zinc-800">
                <input
                  type="text"
                  value={aiChatInput}
                  onChange={(e) => setAiChatInput(e.target.value)}
                  placeholder="Ask your doubt"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAskAI(aiChatInput);
                    }
                  }}
                  className="flex-grow px-3 py-2 bg-zinc-800 text-white text-sm outline-none"
                />
                <button
                  type="button"
                  className="bg-blue-600 px-4 text-white text-sm hover:bg-blue-500"
                  disabled={loadingAI}
                  onClick={() => handleAskAI(aiChatInput)}
                >
                  ↑
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {output && (
          <pre
            className="mt-4 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap pb-30"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {output}
          </pre>
        )}
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditorSide;
