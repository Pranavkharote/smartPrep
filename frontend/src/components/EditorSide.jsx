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
  // const [status, setStatus] = useState("attempted");
  const [timeStart, setTimeStart] = useState(Date.now());
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [languageId, setLanguageId] = useState(63);

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
        question.starterCode ||
        generateStarterCode(question.functionName, languageId);
      setSubmittedCode(code);
    }
  }, [question, languageId]);

  //   const generateStarterCode = (functionName) => {
  //     if (functionName === "twoSum") {
  //       return `/**
  //  * @param {number[]} nums
  //  * @param {number} target
  //  * @return {number[]}
  //  */
  // var ${functionName} = function(nums, target) {

  // };`;
  //     }

  //     // Add more templates for other problems...
  //     return `function ${functionName}() {

  // }`;
  //   };

  const generateStarterCode = (functionName, langId) => {
    if (functionName === "twoSum" && langId === 54) {
      return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var ${functionName} = function(nums, target) {

};`;
    }
    if(functionName === "twoSum" && langId === 62){
      return `class Solution {
    public int[] ${functionName}(int[] nums, int target) {
        
    }
}`
    }
    if(functionName === "twoSum" && langId === 63){
      return `class Solution {
public:
    vector<int> ${functionName}(vector<int>& nums, int target) {
        
    }
};`
    }
    if(functionName === "twoSum" && langId === 71){
      return `class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        `
    }
    if (functionName === "validParentheses" && langId === 54) {//js
      return `/**
 * @param {string} s
 * @return {boolean}
 */
var ${functionName} = function(s){
      //Your code here

}`;
    }
    if (functionName === "validParentheses" && langId === 62 ) {//java
      return `class Solution {
    public boolean ${functionName}(String s) {
        
    }
}`;
    }
    if (functionName === "validParentheses" && langId === 71) {//py
      return `class Solution(object):
    def ${functionName}(self, s):
        """
        :type s: str
        :rtype: bool
        """
        `;
    }
    if (functionName === "validParentheses" && langId === 63) {//cpp
      return `class Solution {
public:
    bool ${functionName}(string s) {
        
    }
};
        `;
    }
    if (functionName === "maximumSubarray" && langId === 63) {//cpp
      return `class Solution {
public:
    int ${functionName}(vector<int>& nums) {
        
    }
};`;
    }
    if (functionName === "maximumSubarray" && langId === 54) {//js
      return `/**
 * @param {number[]} nums
 * @return {number}
 */
var ${functionName} = function(nums) {
    
};`;
    }
    if (functionName === "maximumSubarray" && langId === 62) {//js
      return `class Solution {
    public int ${functionName}(int[] nums) {
        
    }
}`;
    }

    
  };

  const languageMap = {
    54: { piston: "javascript", ace: "javascript", filename: "main.js" },
    62: { piston: "java", ace: "java", filename: "Main.java" },
    71: { piston: "python3", ace: "python", filename: "main.py" },
    63: { piston: "cpp", ace: "c_cpp", filename: "main.cpp" },
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
    });
  };
  const handleSuccessRight = (msg) => {
    toast.dark(msg, {
      position: "bottom-right",
    });
  };
  const handleError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    //original for js working
    //     const wrapCodeWithTests = (submittedCode, question) => {
    //       const { functionName, testCases } = question;

    //       return `
    // ${submittedCode}

    // if (typeof ${functionName} !== "function") {
    //   console.log("error\\n❌ Function '${functionName}' is not defined properly.");
    // } else {
    //   const testCases = ${JSON.stringify(testCases)};
    //   let allPassed = true;
    //   testCases.forEach((test, index) => {
    //     try {
    //       // 👇 Fix: parse input string if necessary
    //       const rawInput = test.input;
    //       const args = Array.isArray(rawInput)
    //         ? rawInput
    //         : typeof rawInput === 'string'
    //           ? [JSON.parse(rawInput)]
    //           : [rawInput];

    //       const result = ${functionName}(...args);
    //       const expected = JSON.parse(test.expectedOutput); // convert "6" -> 6
    //       const passed = JSON.stringify(result) === JSON.stringify(expected);

    //       if (passed) {
    //         console.log(\`✅ Test Case \${index + 1}: Passed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
    //       } else {
    //         console.log(\`❌ Test Case \${index + 1}: Failed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
    //       allPassed = false;
    //       }
    //     } catch (e) {
    //       console.log(\`❌ Test Case \${index + 1}: Crashed - \${e.message}\`);
    //       // console.log(e)
    //       allPassed = false;
    //     }
    //   });

    //   if(allPassed){
    //   console.log("FINAL_STATUS: solved")
    //   } else {
    //    console.log("FINAL_STATUS: attempted")}
    // }
    // `;
    //     };

    //for all langugages
    const wrapCodeWithTests = (submittedCode, question, languageId) => {
      const { functionName, testCases } = question;

      const jsWrapper = `
${submittedCode}

if (typeof ${functionName} !== "function") {
  console.log("error\\n❌ Function '${functionName}' is not defined properly.");
} else {
  const testCases = ${JSON.stringify(testCases)};
  let allPassed = true;
  testCases.forEach((test, index) => {
    try {
      const rawInput = test.input;
      const args = Array.isArray(rawInput)
        ? rawInput
        : typeof rawInput === 'string'
          ? [JSON.parse(rawInput)]
          : [rawInput];

      const result = ${functionName}(...args);
      const expected = JSON.parse(test.expectedOutput);
      const passed = JSON.stringify(result) === JSON.stringify(expected);

      if (passed) {
        console.log(\`✅ Test Case \${index + 1}: Passed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
      } else {
        console.log(\`❌ Test Case \${index + 1}: Failed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
        allPassed = false;
      }
    } catch (e) {
      console.log(\`❌ Test Case \${index + 1}: Crashed - \${e.message}\`);
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log("FINAL_STATUS: solved");
  } else {
    console.log("FINAL_STATUS: attempted");
  }
}
`;

      const pythonWrapper = `
${submittedCode}

def run_tests():
    import json
    all_passed = True
    test_cases = ${JSON.stringify(testCases)}
    for i, test in enumerate(test_cases):
        try:
            args = json.loads(test["input"]) if isinstance(test["input"], str) else test["input"]
            expected = json.loads(test["expectedOutput"])
            result = ${functionName}(*args)
            if result == expected:
                print(f"✅ Test Case {i+1}: Passed\\nExpected: {expected}\\nGot: {result}")
            else:
                print(f"❌ Test Case {i+1}: Failed\\nExpected: {expected}\\nGot: {result}")
                all_passed = False
        except Exception as e:
            print(f"❌ Test Case {i+1}: Crashed - {str(e)}")
            all_passed = False

    if all_passed:
        print("FINAL_STATUS: solved")
    else:
        print("FINAL_STATUS: attempted")

run_tests()
`;

      const cppWrapper = `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

${submittedCode}

int main() {
    bool allPassed = true;
${testCases
  .map((test, i) => {
    return `
    {
        auto result = ${functionName}(${test.input});
        auto expected = ${test.expectedOutput};
        if (result == expected) {
            cout << "✅ Test Case ${
              i + 1
            }: Passed\\\\nExpected: " << expected << "\\\\nGot: " << result << "\\n";
        } else {
            cout << "❌ Test Case ${
              i + 1
            }: Failed\\\\nExpected: " << expected << "\\\\nGot: " << result << "\\n";
            allPassed = false;
        }
    }`;
  })
  .join("\n")}

    if (allPassed) {
        cout << "FINAL_STATUS: solved\\n";
    } else {
        cout << "FINAL_STATUS: attempted\\n";
    }
    return 0;
}
`;

//       const javaWrapper = `
// ${submittedCode}

// public class Main {
//   public static void main(String[] args) {
//     boolean allPassed = true;
// ${testCases
//   .map((test, i) => {
//     return `
//     try {
      
//       int[] input = new int[] ${test.input.replace("[", "{").replace("]", "}")};

//       int expected = ${test.expectedOutput};
//       int result = ${functionName}(input); // or use multiple params if needed
//       if (result == expected) {
//         System.out.println("✅ Test Case ${
//           i + 1
//         }: Passed\\nExpected: " + expected + "\\nGot: " + result);
//       } else {
//         System.out.println("❌ Test Case ${
//           i + 1
//         }: Failed\\nExpected: " + expected + "\\nGot: " + result);
//         allPassed = false;
//       }
//     } catch (Exception e) {
//       System.out.println("❌ Test Case ${i + 1}: Crashed - " + e.getMessage());
//       allPassed = false;
//     }`;
//   })
//   .join("\n")}

//     if (allPassed) {
//       System.out.println("FINAL_STATUS: solved");
//     } else {
//       System.out.println("FINAL_STATUS: attempted");
//     }
//   }
// }
// `;
// 1️⃣ Clean the student's submitted code:
submittedCode = submittedCode.replace(/\bpublic\s+class\s+Solution\b/, "class Solution");

// 2️⃣ Build the full Java wrapper:
const javaWrapper = `
${submittedCode}

public class Main {
  public static void main(String[] args) {
    boolean allPassed = true;
    Solution solution = new Solution();
    ${testCases
      .map((test, i) => {
        return `
    try {
      int[] input = new int[] ${test.input.replace("[","{").replace("]","}")};
      int expected = ${test.expectedOutput};
      int result = solution.${functionName}(input); // call method on solution
      if (result == expected) {
        System.out.println("✅ Test Case ${i + 1}: Passed\\nExpected: " + expected + "\\nGot: " + result);
      } else {
        System.out.println("❌ Test Case ${i + 1}: Failed\\nExpected: " + expected + "\\nGot: " + result);
        allPassed = false;
      }
    } catch (Exception e) {
      System.out.println("❌ Test Case ${i + 1}: Crashed - " + e.getMessage());
      allPassed = false;
    }`;
      })
      .join("\n")}
    if (allPassed) {
      System.out.println("FINAL_STATUS: solved");
    } else {
      System.out.println("FINAL_STATUS: attempted");
    }
  }
}
`;



      //       const javaWrapper = `
      // ${submittedCode}

      // public class Main {
      //   public static void main(String[] args) {
      //     boolean allPassed = true;
      // ${testCases
      //   .map((test, i) => {
      //     return `
      //     try {
      //       var result = ${functionName}(${test.input});
      //       var expected = ${test.expectedOutput};
      //       if (result.equals(expected)) {
      //         System.out.println("✅ Test Case ${
      //           i + 1
      //         }: Passed\\nExpected: " + expected + "\\nGot: " + result);
      //       } else {
      //         System.out.println("❌ Test Case ${
      //           i + 1
      //         }: Failed\\nExpected: " + expected + "\\nGot: " + result);
      //         allPassed = false;
      //       }
      //     } catch (Exception e) {
      //       System.out.println("❌ Test Case ${i + 1}: Crashed - " + e.getMessage());
      //       allPassed = false;
      //     }`;
      //   })
      //   .join("\n")}

      //     if (allPassed) {
      //       System.out.println("FINAL_STATUS: solved");
      //     } else {
      //       System.out.println("FINAL_STATUS: attempted");
      //     }
      //   }
      // }
      // `
      // Return appropriate wrapper based on languageId
      switch (languageId) {
        case 54:
          return jsWrapper;
        case 71:
          return pythonWrapper;
        case 63:
          return cppWrapper;
        case 62:
          return javaWrapper;
        default:
          return submittedCode;
      }
    };

    const wrappedCode = wrapCodeWithTests(submittedCode, question, languageId);
    // const wrappedCode = wrapCodeWithTests(submittedCode, question);

    try {
      const langInfo = languageMap[languageId];
      // const codeToRun =
      //   langInfo.piston === "javascript" ? wrappedCode : submittedCode;
      const codeToRun =
        langInfo.piston === "javascript" ||
        langInfo.piston === "python3" ||
        langInfo.piston === "cpp" ||
        langInfo.piston === "java"
          ? wrappedCode
          : submittedCode;
      const result = await runCodeWithPiston({
        // language: "javascript",
        language: langInfo.piston,
        // language: languageId === 62 ? "java" : languageId === 71 ? "python3" : languageId === 63 ? "cpp" : "javascript",
        code: codeToRun,
        filename: langInfo.filename,
        // code: submittedCode,
      });

      // console.log("🚀 Piston Result:", result);

      const output =
        result?.run?.stdout?.trim() ||
        result?.run?.stderr?.trim() ||
        result?.run?.output?.trim() ||
        "No output returned.";

      setOutput(output);

      // Detect and auto-submit if "FINAL_STATUS" is present
      if (output.includes("FINAL_STATUS:")) {
        const isSolved = output.includes("FINAL_STATUS: solved");
        const submissionStatus = isSolved ? "solved" : "attempted";

        const timeTaken = Math.floor((Date.now() - timeStart) / 1000);
        const payload = {
          questionId: questionId,
          status: submissionStatus,
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
            handleSuccessRight(
              submissionStatus === "solved"
                ? "✅ All test cases passed!"
                : "⚠️ Some failed test cases."
            );
            if (submissionStatus === "solved")
              //  setSubmittedCode("");
              setTimeStart(Date.now());
          } else {
            handleError(message);
          }
        } catch (err) {
          handleError(err.response?.data?.message || err.message);
        }
      }
    } catch (error) {
      setOutput("❌ Error running code: " + (error.message || "Unknown error"));
    }

    setRunning(false);
  };

  //ai
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
      <div className="flex absolute top-4 text-black right-1">
        <select
          value={languageId}
          onChange={(e) => setLanguageId(parseInt(e.target.value))}
          className="mb-2 p-2 border rounded h-9 mr-5 bg-white "
        >
          <option value={62}>Java</option>
          <option value={54}>JavaScript</option>
          <option value={71}>Python</option>
          <option value={63}>C++</option>
        </select>
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
            onClick={() => handleSuccess("Code Submitted")}
            type="submit"
            className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Submit Code
          </button>
          <button
            onClick={() => setShowAI(!showAI)}
            type="button"
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
      <ToastContainer />
    </div>
  );
};

export default EditorSide;
