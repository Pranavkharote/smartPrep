import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { runCodeWithPiston } from "../api/Piston";
import "../index.css";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "./CodeEditor";
import { generateStarterCode } from "../utils/generateStarterCode";
import { wrapCodeWithTests } from "../utils/wrapCodeWithTestCases";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import MarkdownRenderer from "../utils/MarkdownRenderer";
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const EditorSide = ({ question }) => {
  const [timeStart, setTimeStart] = useState(Date.now());
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(null);

  const navigate = useNavigate();

  //AI
  const [showAI, setShowAI] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiChatInput, setAiChatInput] = useState("");
  const { questionId } = useParams();
  const [aiChatHistory, setAiChatHistory] = useState([]);
  const [currentCode, setCurrentCode] = useState("");
  const [formattedTime, setFormattedTime] = useState("00:00");
  const [timerRunning, setTimerRunning] = useState(false);
  const [languageId, setLanguageId] = useState(
    () => parseInt(localStorage.getItem("languageId")) || 54 // 54 is JS as default
  );

  useEffect(() => {
    localStorage.setItem("languageId", languageId);
  }, [languageId]);

  useEffect(() => {
    if (question?.starterCode) {
      setSubmittedCode(question.starterCode);
    }
    if (question) {
      const code =
        question.starterCode ||
        generateStarterCode(question.functionName, languageId);
      setSubmittedCode(code);
    }
  }, [question, languageId]);
  useEffect(() => {
    setStartedAt(Date.now());
  }, []);
  useEffect(() => {
    if (question && languageId) {
      const starter = generateStarterCode(question.functionName, languageId);
      setSubmittedCode(starter);
    }
  }, [question, languageId]);

  const languageMap = {
    54: { piston: "javascript", ace: "javascript", filename: "main.js" },
    62: { piston: "java", ace: "java", filename: "Main.java" },
    71: { piston: "python3", ace: "python", filename: "main.py" },
    63: { piston: "cpp", ace: "c_cpp", filename: "main.cpp" },
  };

  const handleError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userCode = submittedCode; // User's current code
  //   const starterCode = generateStarterCode(question.functionName, languageId);

  //   if (!userCode || !starterCode) {
  //     toast.error("Code or starter template is missing.");
  //     return;
  //   }

  //   const normalize = (code) =>
  //     code
  //       .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "") // remove comments
  //       .replace(/\s/g, ""); // remove whitespace

  //   if (normalize(userCode) === normalize(starterCode)) {
  //     toast.error("⚠️ Please write your solution before submitting.");
  //     return;
  //   }

  //   // runCode(userCode);
  //   await runCode(true);
  //   toast.success("Code Submitted.!");
  // };

  // const runCode = async (submit = false) => {
  //   const finalSubmittedCode = submittedCode.trim();

  //   if (!languageId) {
  //     toast.error("Please select a programming language.");
  //     return;
  //   }
  //   if (!submittedCode.trim()) {
  //     toast.error("Please enter code to run.");
  //     return;
  //   }
  //   if (!question) {
  //     toast.error("Question not loaded yet.");
  //     return;
  //   }
  //   setRunning(true);
  //   setOutput("Running...");

  //   const testCases = question.testCases || [];
  //   if (testCases.length === 0) {
  //     setOutput("No test cases available.");
  //     setRunning(false);
  //     return;
  //   }

  //   const wrappedCode = wrapCodeWithTests(submittedCode, question, languageId);
  //   try {
  //     const langInfo = languageMap[languageId];
  //     const codeToRun =
  //       langInfo.piston === "javascript" ||
  //       langInfo.piston === "python3" ||
  //       langInfo.piston === "cpp" ||
  //       langInfo.piston === "java"
  //         ? wrappedCode
  //         : submittedCode;
  //     const result = await runCodeWithPiston({
  //       language: langInfo.piston,
  //       code: codeToRun,
  //       filename: langInfo.filename,
  //     });

  //     const output =
  //       result?.run?.stdout?.trim() ||
  //       result?.run?.stderr?.trim() ||
  //       result?.run?.output?.trim() ||
  //       "No output returned.";
  //     setOutput(output);

  //     if (submit && output.includes("FINAL_STATUS:")) {
  //       const isSolved = output.includes("FINAL_STATUS: solved");
  //       const submissionStatus = isSolved ? "solved" : "attempted";

  //       const timeTaken = Math.floor((Date.now() - timeStart) / 1000);
  //       console.log("user took :", timeTaken);

  //       if (submit) {
  //         const payload = {
  //           questionId: questionId,
  //           languageId: languageId,
  //           status: submissionStatus,
  //           timeTaken: timeTaken,
  //           submittedCode: finalSubmittedCode,
  //         };
  //         console.log("💾 Submitting code:", {
  //           languageId,
  //           submittedCode: finalSubmittedCode,
  //           output,
  //         });

  //         try {
  //           const { data } = await axios.post(
  //             // "http://localhost:8080/submission",
  //             `${BACKEND_URL}/submission`,
  //             payload,
  //             { withCredentials: true }
  //           );

  //           const { success, message } = data;
  //           if (success === true || success === "true") {
  //             if (submissionStatus === "solved") setTimeStart(Date.now());
  //             console.log(timeTaken);
  //           } else {
  //             handleError(message);
  //           }
  //         } catch (err) {
  //           handleError(err.response?.data?.message || err.message);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     setOutput("❌ Error running code: " + (error.message || "Unknown error"));
  //   }

  //   setRunning(false);
  // };

  //ai;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCode = submittedCode;
    const starterCode = generateStarterCode(question.functionName, languageId);

    const normalize = (code) =>
      code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").replace(/\s/g, "");

    if (
      !userCode ||
      !starterCode ||
      normalize(userCode) === normalize(starterCode)
    ) {
      toast.error("⚠️ Please write your solution before submitting.");
      return;
    }

    const testCases = question.testCases || [];
    if (testCases.length === 0) {
      toast.error("No test cases available.");
      return;
    }

    setRunning(true);
    setOutput("Running...");

    const finalSubmittedCode = submittedCode.trim();
    const langInfo = languageMap[languageId];
    const wrappedCode = wrapCodeWithTests(
      finalSubmittedCode,
      question,
      languageId
    );
    const codeToRun = ["javascript", "python3", "cpp", "java"].includes(
      langInfo.piston
    )
      ? wrappedCode
      : finalSubmittedCode;

    try {
      const result = await runCodeWithPiston({
        language: langInfo.piston,
        code: codeToRun,
        filename: langInfo.filename,
      });

      const output =
        result?.run?.stdout?.trim() ||
        result?.run?.stderr?.trim() ||
        result?.run?.output?.trim() ||
        "No output returned.";
      setOutput(output);

      if (output.includes("FINAL_STATUS:")) {
        const isSolved = output.includes("FINAL_STATUS: solved");
        const timeTaken = Math.floor((Date.now() - timeStart) / 1000);
        const payload = {
          questionId: questionId,
          languageId: languageId,
          status: isSolved ? "solved" : "attempted",
          timeTaken: timeTaken,
          submittedCode: finalSubmittedCode,
        };

        const { data } = await axios.post(
          `${BACKEND_URL}/submission`,
          payload,
          {
            withCredentials: true,
          }
        );

        if (data.success) {
          toast.success("Code submitted successfully!");

          if (isSolved) setTimeStart(Date.now());
        } else {
          handleError(data.message || "Submission failed.");
        }
      } else {
        toast.error("❌ Tests did not pass. Submission not saved.");
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
    }

    setRunning(false);
  };

  const runCode = async () => {
    if (!languageId || !submittedCode.trim() || !question) {
      toast.error("Language, code, or question is missing.");
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

    const wrappedCode = wrapCodeWithTests(submittedCode, question, languageId);
    const langInfo = languageMap[languageId];
    const codeToRun = ["javascript", "python3", "cpp", "java"].includes(
      langInfo.piston
    )
      ? wrappedCode
      : submittedCode;

    try {
      const result = await runCodeWithPiston({
        language: langInfo.piston,
        code: codeToRun,
        filename: langInfo.filename,
      });

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

  const handleAskAI = async (forcedPrompt = null) => {
    let rawPrompt = forcedPrompt || aiChatInput;

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
      const languageLabelMap = {
        javascript: "js",
        python: "python",
        cpp: "cpp",
        java: "java",
      };

      const selectedLang = languageLabelMap[languageId] || "txt";
      const fullPrompt = `
You are a helpful AI coding assistant.

The user is working on a programming question titled:
**${question.title}**

**Description:**
${question.description}

---

Here is the user's code:

\`\`\`${selectedLang}
${currentCode}
\`\`\`

---

Now answer the following question based on the above code and problem:
${promptToSend}
`;
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ask`,
        {
          prompt: fullPrompt,
          userprompt: promptToSend,
          questionTitle: question.title,
          questionDescription: question.description,
          userCode: submittedCode,
        }
      );
      const aiAnswer = response.data.answer || "AI didn't respond";
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
    setAiChatHistory([]);
  }, [question.id]);

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

  const [aiAsked, setAiAsked] = useState(false);
  useEffect(() => {
    if (aiChatInput) {
      setAiAsked(false);
    }
  }, [aiChatInput]);

  return (
    <div className="w-1/2 py-2 editorSide">
      <div className="flex absolute top-4 right-35">
        <select
          value={languageId}
          onChange={(e) => setLanguageId(parseInt(e.target.value))}
          className="mb-2 p-2 border rounded h-9 mr-5  "
        >
          <option value={54} default>
            JavaScript
          </option>
          <option value={63}>C++</option>
          <option value={71}>Python</option>
          <option
            value={62}
            disabled
            title="Coming Soon🚧 (I am working on it)"
          >
            Java
          </option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <CodeEditor
          code={submittedCode}
          setCode={setSubmittedCode}
          onCodeChange={(updatedCode) => {
            setCurrentCode(updatedCode);
          }}
        />
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={runCode}
            disabled={running}
            title="Run Code"
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {running ? "Running..." : "Run Code"}
          </button>
          <button
            type="submit"
            title="Submit Code"
            className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Submit Code
          </button>
          <div
            title="Ask Any Query to AI"
            onClick={() => setShowAI(!showAI)}
            className="fixed bottom-5 cursor-pointer right-5 bg-[#0069f2] px-5 py-2 rounded-full shadow-2xl hover:bg-cyan-800 z-50"
          >
            🧠 Ask AI
          </div>

          <AnimatePresence />
          {showAI && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed w-[400px] bottom-15 right-4 bg-gray-900 text-white shadow-xl rounded-xl overflow-hidden z-50 flex flex-col"
            >
              <div className="p-4 border-b w-[400px] border-zinc-800 font-semibold flex justify-between items-center">
                <span>🧠 SmartPrep AI</span>
                <button
                  onClick={() => setShowAI(false)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <i class="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="px-2 py-2 h-[360px] overflow-y-auto border-t border-zinc-800">
                <div className="space-y-2 text-sm font-semibold">
                  <div
                    onClick={() =>
                      handleQuickAsk("Can you explain the problem statement?")
                    }
                    className="w-full cursor-pointer bg-yellow-500 text-black py-2 px-3 rounded-md hover:bg-yellow-400 shadow-sm flex items-center gap-2 transition"
                    title="AI will help you understand the problem"
                  >
                    ✨ Need help understanding the problem
                  </div>

                  <div
                    onClick={() => handleQuickAsk("Explain My Code")}
                    className="w-full cursor-pointer bg-pink-500 text-white py-2 px-3 rounded-md hover:bg-pink-400 shadow-sm flex items-center gap-2 transition"
                    title="AI will analyze and explain your written code"
                  >
                    🤖 Ask AI to Explain Code
                  </div>

                  <div
                    onClick={() =>
                      handleQuickAsk(
                        "What is the logic or approach to solve this problem?"
                      )
                    }
                    className="w-full cursor-pointer bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-500 shadow-sm flex items-center gap-1 transition"
                    title="AI will guide you with logic or solving approach"
                  >
                    🧠 Need help with logic / approach
                  </div>
                </div>

                {aiChatHistory.map((msg, index) => (
                  <div key={index} className="mb-3 ">
                    <p className="text-cyan-400 font-medium">
                      You:{" "}
                      <span className="text-white text-sm">{msg.user}</span>
                    </p>
                    <p className="text-white text-sm">
                      <span className="text-green-400 font-bold">AI:</span>
                      {typeof msg.ai === "string" ? (
                        <MarkdownRenderer markdownText={msg.ai} />
                      ) : (
                        <p className="text-red-500">
                          ⚠️ Invalid AI response format
                        </p>
                      )}
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
            className="mt-4 p-4 rounded text-sm whitespace-pre-wrap pb-30"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {output}
          </pre>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditorSide;
