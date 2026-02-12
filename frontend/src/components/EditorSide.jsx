import axios from "../api/axiosConfig";
import { useRef } from "react";
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

const EditorSide = ({ question }) => {
  const [timeStart, setTimeStart] = useState(Date.now());
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(null);

  const navigate = useNavigate();
  const aiBottomRef = useRef(null);

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
    () => parseInt(localStorage.getItem("languageId")) || 54
  );

  useEffect(() => {
    setAiChatHistory([]);
    setAiChatInput("");
    setLoadingAI(false);
    setShowAI(false);
  }, [questionId]);

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

  useEffect(() => {
    aiBottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [aiChatHistory, loadingAI]);

  useEffect(() => {
    if (aiChatInput) {
      aiBottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [aiChatInput]);

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
        console.table(payload);

        const { data } = await axios.post(
          `/submission`,
          // "http://localhost:8080/submission",
          payload,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          toast.success("Code submitted successfully!");
          navigate(`/questions/${questionId}/submission`);

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
        54: "javascript",
        71: "python",
        63: "cpp",
        62: "java",
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
        `/ask`,
        // `http://localhost:8080/ask`,
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
    <div className="w-full lg:w-1/2 p-3 bg-gradient-to-b from-[#0f0f1a] to-[#05050d] text-white border border-white/10 flex flex-col relative rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 backdrop-blur-xl">
          <select
            value={languageId}
            onChange={(e) => setLanguageId(parseInt(e.target.value))}
            className="px-3 py-2 rounded bg-black/40 border border-white/20 text-sm focus:outline-none"
          >
            <option value={54}>JavaScript</option>
            <option value={63}>C++</option>
            <option value={71}>Python</option>
            <option value={62} disabled>
              Java (Coming Soon)
            </option>
          </select>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={runCode}
              disabled={running}
              className="px-5 py-2 rounded-md font-semibold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:scale-105 transition shadow-lg disabled:opacity-50"
            >
              {running ? "Running..." : "▶ Run"}
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition shadow-lg"
            >
              ⬆ Submit
            </button>
          </div>
        </div>

        <div onSubmit={handleSubmit} className="flex flex-col flex-grow">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-inner bg-black/40">
            <CodeEditor
              code={submittedCode}
              setCode={setSubmittedCode}
              onCodeChange={(updatedCode) => setCurrentCode(updatedCode)}
            />
          </div>

          {output && (
            <pre className="mt-4 p-4 rounded-lg text-sm bg-black border border-green-500/30 text-slate-200 max-h-[200px] overflow-y-auto font-mono shadow-inner">
              {output}
            </pre>
          )}
        </div>
      </form>

      <div
        onClick={() => setShowAI(!showAI)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white 
    bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
    shadow-[0_0_25px_rgba(236,72,153,0.8)] 
    hover:scale-110 transition cursor-pointer"
      >
        🤖 Ask AI
      </div>

      <AnimatePresence />
      {showAI && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 right-4 w-[94%] sm:w-[420px] bg-gradient-to-b from-[#0b0b15] to-[#020208] border border-white/10 shadow-2xl rounded-xl overflow-hidden z-50 flex flex-col"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center font-bold tracking-wide bg-black/40">
            <span>🧠 SmartPrep AI</span>
            <button
              onClick={() => setShowAI(false)}
              className="text-gray-400 hover:text-red-400"
            >
              ✕
            </button>
          </div>

          <div className="px-3 py-2 h-[350px] overflow-y-auto border-t border-white/10">
            <div className="space-y-2 text-sm font-semibold mb-3">
              {[
                [
                  "✨ Understand Problem",
                  "Can you explain the problem statement?",
                  "bg-yellow-500",
                ],
                ["🤖 Explain My Code", "Explain My Code", "bg-emerald-500"],
                ["🧾 Summarize Code", "Summarize my Code", "bg-pink-500"],
                ["🧩 Review Code", "Review My Code", "bg-purple-500"],
                [
                  "🧠 Logic Help",
                  "What is the logic or approach to solve this problem?",
                  "bg-red-600",
                ],
              ].map(([label, prompt, color], i) => (
                <div
                  key={i}
                  onClick={() => handleQuickAsk(prompt)}
                  className={`${color} text-white py-2 px-3 rounded-md cursor-pointer hover:scale-[1.02] transition shadow`}
                >
                  {label}
                </div>
              ))}
            </div>

            {aiChatHistory.map((msg, index) => (
              <div key={index} className="mb-3 text-sm">
                <p className="text-cyan-400 font-semibold">
                  You: <span className="text-white">{msg.user}</span>
                </p>
                <div className="text-slate-200 mt-1">
                  AI:
                  {typeof msg.ai === "string" ? (
                    <MarkdownRenderer markdownText={msg.ai} />
                  ) : (
                    <p className="text-red-500">Invalid AI response</p>
                  )}
                </div>
              </div>
            ))}

            {loadingAI && (
              <p className="italic text-gray-500">AI is thinking...</p>
            )}
            <div ref={aiBottomRef} />
          </div>

          <div className="flex border-t border-white/10 bg-black/50">
            <input
              type="text"
              value={aiChatInput}
              onChange={(e) => setAiChatInput(e.target.value)}
              placeholder="Ask your doubt"
              className="flex-grow px-3 py-2 bg-transparent text-white text-sm outline-none"
            />
            <button
              type="button"
              disabled={loadingAI}
              onClick={() => handleAskAI(aiChatInput)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-white hover:brightness-110"
            >
              ↑
            </button>
          </div>
        </motion.div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditorSide;

