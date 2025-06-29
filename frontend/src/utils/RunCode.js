import axios from "axios";
import React from "react";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { runCodeWithPiston } from "../api/Piston";
import "../index.css";
import { useState } from "react";
function RunCodeExecutor() {
  const [timeStart, setTimeStart] = useState(Date.now());
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [languageId, setLanguageId] = useState(
    () => parseInt(localStorage.getItem("languageId")) || 54 // 54 is JS as default
  );

  const HandleRunCode = async () => {
    setSubmittedCode(submittedCode);
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

     const args =
  typeof test.input === 'object' && !Array.isArray(test.input)
    ? Object.values(test.input)
    : [test.input];

      const expected = test.expectedOutput;
      
      const result = ${functionName}(...args);
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

      const formatArray = (arr) =>
        Array.isArray(arr) ? `vector<int>{${arr.join(", ")}}` : "vector<int>{}";

      const cppWrapper = `
#include <iostream>
#include <vector>
using namespace std;

${submittedCode}

void printVector(const vector<int>& vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i];
        if (i != vec.size() - 1) cout << ", ";
    }
    cout << "]";
}

bool areEqual(const vector<int>& a, const vector<int>& b) {
    if (a.size() != b.size()) return false;
    for (size_t i = 0; i < a.size(); ++i) {
        if (a[i] != b[i]) return false;
    }
    return true;
}

int main() {
    bool allPassed = true;

${testCases
  .map((test, i) => {
    const inputStr = formatArray(test.input);
    const expectedStr = formatArray(test.expectedOutput);

    return `
    try {
        vector<int> result = ${functionName}(${inputStr});
        vector<int> expected = ${expectedStr};

        if (areEqual(result, expected)) {
            cout << "✅ Test Case ${i + 1}: Passed\\n";
        } else {
            cout << "❌ Test Case ${i + 1}: Failed\\n";
            cout << "Expected: "; printVector(expected); cout << "\\n";
            cout << "Got: "; printVector(result); cout << "\\n";
            allPassed = false;
        }
    } catch (...) {
        cout << "❌ Test Case ${i + 1}: Crashed\\n";
        allPassed = false;
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

      // const safeCode = submittedCode.replace(/\bpublic\s+class\s+Solution\b/, "class Solution");
      const safeCode = submittedCode
        .replace(/\bpublic\s+class\s+Solution\b/, "class Solution")
        .replace(/\bpublic\s+class\s+Main\b/, "class Main"); // in case user writes 'Main'

      // const javaWrapper = `
      // ${safeCode}

      // public class Main {
      //   public static void main(String[] args) {
      //     boolean allPassed = true;
      //     Solution solution = new Solution();

      // ${testCases
      //   .map((test, i) => {
      //     const input = test.input;
      //     const expected = test.expectedOutput;

      //     let numsArray = 'new int[]{}';
      //     let target = 0;

      //     if (typeof input === "object" && input !== null && Array.isArray(input.nums)) {
      //       numsArray = `new int[]{${input.nums.join(",")}}`;
      //       target = input.target;
      //     }

      //     return `
      //     try {
      //       int[] nums = ${numsArray};
      //       int target = ${target};
      //       int[] result = solution.${functionName}(nums, target);
      //       int[] expected = new int[]{${expected.join(",")}};

      //       boolean passed = java.util.Arrays.equals(result, expected);

      //       if (passed) {
      //         System.out.println("✅ Test Case ${i + 1}: Passed");
      //       } else {
      //         System.out.println("❌ Test Case ${i + 1}: Failed");
      //         System.out.println("Expected: " + java.util.Arrays.toString(expected));
      //         System.out.println("Got: " + java.util.Arrays.toString(result));
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
      let javaWrapper;

      if (testCases && testCases.length > 0) {
        // ✅ Regular dynamic case
        javaWrapper = `
${safeCode}
public class Main {
  public static void main(String[] args) {
    boolean allPassed = true;
    Solution solution = new Solution();
    
${testCases
  .map((test, i) => {
    const input = test.input;
    const expected = test.expectedOutput;

    let numsArray = "new int[]{}";
    let target = 0;

    if (
      typeof input === "object" &&
      input !== null &&
      Array.isArray(input.nums)
    ) {
      numsArray = `new int[]{${input.nums.join(",")}}`;
      target = input.target;
    }

    return `
    try {
      int[] nums = ${numsArray};
      int target = ${target};
      int[] result = solution.${functionName}(nums, target);
      int[] expected = new int[]{${expected.join(",")}};

      boolean passed = java.util.Arrays.equals(result, expected);
      
      if (passed) {
        System.out.println("✅ Test Case ${i + 1}: Passed");
      } else {
        System.out.println("❌ Test Case ${i + 1}: Failed");
        System.out.println("Expected: " + java.util.Arrays.toString(expected));
        System.out.println("Got: " + java.util.Arrays.toString(result));
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
      } else {
        // ✅ Fallback: static Java wrapper (hardcoded demo)
        javaWrapper = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        java.util.HashMap<Integer, Integer> map = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }
}

public class Main {
  public static void main(String[] args) {
    Solution solution = new Solution();
    int[] result = solution.twoSum(new int[]{2, 7, 11, 15}, 9);
    System.out.println("Result: " + java.util.Arrays.toString(result));
  }
}
`;
      }

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
          languageId: languageId,
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
          console.log(data);
          if (success === true || success === "true") {
            // handleSuccessRight(
            //   submissionStatus === "solved"
            //     ? "✅ All test cases passed!"
            //     : "⚠️ Some failed test cases."
            // );
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
}
export default RunCode;
