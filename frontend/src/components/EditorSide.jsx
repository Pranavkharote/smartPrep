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
import MarkdownRenderer from "../utils/MarkdownRenderer";
// import { ErrorBoundary } from "../context/ErrorBoundry";

const EditorSide = ({ question }) => {
  // const [status, setStatus] = useState("attempted");
  const [timeStart, setTimeStart] = useState(Date.now());
  const [submittedCode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  // const [languageId, setLanguageId] = useState(63);

  //AI
  const [showAI, setShowAI] = useState(false);
  // const [aiResponse, setAiResponce] = useState("");
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

  // 2. Save to localStorage every time the language changes
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
    if (functionName === "twoSum" && langId === 62) {
      return `class Solution {
    public int[] ${functionName}(int[] nums, int target) {
        
    }
}`;
    }
    if (functionName === "twoSum" && langId === 63) {
      return `class Solution {
public:
    vector<int> ${functionName}(vector<int>& nums, int target) {
        
    }
};`;
    }
    if (functionName === "twoSum" && langId === 71) {
      return `from typing import List
class Solution:
    def ${functionName}(self, nums: List[int], target: int) -> List[int]:
    `;
    }
    if (functionName === "isValid" && langId === 54) {
      //js
      return `/**
 * @param {string} s
 * @return {boolean}
 */
var ${functionName} = function(s){
      //Your code here

}`;
    }
    if (functionName === "isValid" && langId === 62) {
      //java
      return `class Solution {
    public boolean ${functionName}(String s) {
        
    }
}`;
    }
    if (functionName === "isValid" && langId === 71) {
      //py
      return `class Solution:
    def ${functionName}(self, s: str) -> bool:
        
        `;
    }
    if (functionName === "isValid" && langId === 63) {
      //cpp
      return `class Solution {
public:
    bool ${functionName}(string s) {
        
    }
};
        `;
    }
    if (functionName === "maximumSubarray" && langId === 63) {
      //cpp
      return `class Solution {
public:
    int ${functionName}(vector<int>& nums) {
        
    }
};`;
    }
    if (functionName === "maximumSubarray" && langId === 54) {
      //js
      return `/**
 * @param {number[]} nums
 * @return {number}
 */
var ${functionName} = function(nums) {
    
};`;
    }
    if (functionName === "maximumSubarray" && langId === 62) {
      //js
      return `class Solution {
    public int ${functionName}(int[] nums) {
        
    }
}`;
    }
    if (functionName === "maximumSubarray" && langId === 71) {
      //py
      return `from typing import List
class Solution:
    def ${functionName}(self, nums: List[int]) -> int:   
     `;
    }
    if (functionName === "mergeTwoSortedLists" && langId === 71) {
      //js
      return `# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def ${functionName} (self, list1, list2):
        """
        :type list1: Optional[ListNode]
        :type list2: Optional[ListNode]
        :rtype: Optional[ListNode]
        """
        `;
    }
    if (functionName === "mergeTwoSortedLists" && langId === 54) {
      //js
      return `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var ${functionName} = function(list1, list2) {
    
};`;
    }
    if (functionName === "mergeTwoSortedList" && langId === 62) {
      //js
      return `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode ${functionName}(ListNode list1, ListNode list2) {
        
    }
}`;
    }
    if (functionName === "mergeTwoSortedList" && langId === 63) {
      //js
      return `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* ${functionName}(ListNode* list1, ListNode* list2) {
        
    }
};`;
    }
    if (functionName === "bestTimeToBuyAndSellStock" && langId === 63) {
      return `class Solution {
public:
    int ${functionName}(vector<int>& prices) {
        
    }
};`;
    }
    if (functionName === "bestTimeToBuyAndSellStock" && langId === 62) {
      return `class Solution {
    public int ${functionName}(int[] prices) {
        //your code here

    }
}`;
    }
    if (functionName === "bestTimeToBuyAndSellStock" && langId === 54) {
      return `/**
 * @param {number[]} prices
 * @return {number}
 */
var ${functionName} = function(prices) {
    
};`;
    }
    if (functionName === "bestTimeToBuyAndSellStock" && langId === 71) {
      return `from typing import List
class Solution:
    def ${functionName}(self, prices: List[int]) -> int: 
     `;
    }
    if (functionName === "removeDuplicatesFromSortedArray" && langId === 63) {
      return `class Solution {
public:
    int ${functionName}(vector<int>& nums) {
        
    }
};`;
    }
    if (functionName === "removeDuplicatesFromSortedArray" && langId === 62) {
      return `class Solution {
    public int ${functionName}(int[] nums) {
        
    }
}`;
    }
    if (functionName === "removeDuplicatesFromSortedArray" && langId === 54) {
      return `/**
 * @param {number[]} nums
 * @return {number}
 */
var ${functionName} = function(nums) {
    
};`;
    }
    if (functionName === "removeDuplicatesFromSortedArray" && langId === 71) {
      return `class Solution(object):
    def ${functionName}(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        `;
    }
    if (functionName === "climbStairs" && langId === 54) {
      return `/**
 * @param {number} n
 * @return {number}
 */
var ${functionName} = function(n) {
    
};`;
    }
    if (functionName === "climbStairs" && langId === 63) {
      return `class Solution {
public:
    int ${functionName}(int n) {
        
    }
};`;
    }
    if (functionName === "climbStairs" && langId === 62) {
      return `class Solution {
    public int ${functionName}(int n) {
        
    }
}
};`;
    }
    if (functionName === "climbStairs" && langId === 71) {
      return `class Solution:
    def ${functionName}(self, n: int) -> int:
        `;
    }
  };
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
console.log(timerRunning)
  const handleError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCode = submittedCode; // User's current code
    const starterCode = generateStarterCode(question.functionName, languageId);
    console.log(starterCode); // Starter template

    if (!userCode || !starterCode) {
      toast.error("Code or starter template is missing.");
      return;
    }

    const normalize = (code) =>
      code
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "") // remove comments
        .replace(/\s/g, ""); // remove whitespace

    if (normalize(userCode) === normalize(starterCode)) {
      toast.error("⚠️ Please write your solution before submitting.");
      return;
    }

    runCode(userCode);
    console.log(userCode);
    toast.success("Code Submitted.!");
  };

  const runCode = async () => {
    // setSubmittedCode(submittedCode);
    const finalSubmittedCode = submittedCode.trim();

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

      //       const pythonWrapper = `
      // ${submittedCode}

      // def run_tests():
      //     all_passed = True
      //     test_cases = ${JSON.stringify(testCases)}
      //     solution = Solution()

      //   def normalize(x):
      //     if isinstance(x, str) and x.isdigit():
      //         return int(x)
      //     if isinstance(x, str):
      //         x = x.lower()
      //         if x == "true":
      //             return True
      //         if x == "false":
      //             return False
      //         return x
      //     if isinstance(x, (bool, int, float)):
      //         return x
      //     if isinstance(x, list):
      //         return [normalize(i) for i in x]
      //     return x

      // def print_result(i, result, expected):
      //     if normalize(result) == normalize(expected):
      //         print(f"✅ Test Case {i+1}: Passed\\nExpected: {expected}\\nGot: {result}")
      //         return True
      //     else:
      //         print(f"❌ Test Case {i+1}: Failed\\nExpected: {expected}\\nGot: {result}")
      //         return False

      //     for i, test in enumerate(test_cases):
      //         try:
      //             input_data = test["input"]
      //             expected = test["expectedOutput"]

      //             # Custom logic for each function
      //             if "${functionName}" == "maximumSubarray":
      //                 result = solution.maximumSubarray(input_data)
      //                 if not print_result(i, result, expected):
      //                     all_passed = False

      //             elif "${functionName}" == "twoSum":
      //                 nums = input_data.get("nums", [])
      //                 target = input_data.get("target", 0)
      //                 result = solution.twoSum(nums, target)
      //                 if not print_result(i, result, test["expectedOutput"]):
      //                     all_passed = False

      //             elif "${functionName}" == "isValid":
      //                 s = input_data
      //                 result = solution.isValid(s)
      //                 if not print_result(i, result, expected):
      //                     all_passed = False

      //             elif "${functionName}" == "climbStairs":
      //                 n = input_data
      //                 result = solution.climbStairs(n)
      //                 if not print_result(i, result, expected):
      //                     all_passed = False

      //             elif "${functionName}" == "bestTimeToBuyAndSellStock":
      //                 prices = input_data
      //                 result = solution.bestTimeToBuyAndSellStock(prices)
      //                 if not print_result(i, result, expected):
      //                     all_passed = False

      //             else:
      //                 print(f"⚠️ Unsupported functionName: ${functionName}")
      //                 all_passed = False

      //         except Exception as e:
      //             print(f"❌ Test Case {i+1}: Crashed - {str(e)}")
      //             all_passed = False

      //     if all_passed:
      //         print("FINAL_STATUS: solved")
      //     else:
      //         print("FINAL_STATUS: attempted")

      // run_tests()
      // `;

      const pythonWrapper = `
${submittedCode}

def run_tests():
    all_passed = True
    test_cases = ${JSON.stringify(testCases)}
    solution = Solution()

    def normalize(x):
        if isinstance(x, str) and x.isdigit():
            return int(x)
        if isinstance(x, str):
            x = x.lower()
            if x == "true":
                return True
            if x == "false":
                return False
            return x
        if isinstance(x, (bool, int, float)):
            return x
        if isinstance(x, list):
            return [normalize(i) for i in x]
        return x

    def print_result(i, result, expected):
        if normalize(result) == normalize(expected):
            print(f"✅ Test Case {i+1}: Passed\\nExpected: {expected}\\nGot: {result}")
            return True
        else:
            print(f"❌ Test Case {i+1}: Failed\\nExpected: {expected}\\nGot: {result}")
            return False

    for i, test in enumerate(test_cases):
        try:
            input_data = test["input"]
            expected = test["expectedOutput"]

            if "${functionName}" == "maximumSubarray":
                result = solution.maximumSubarray(input_data)
                if not print_result(i, result, expected):
                    all_passed = False

            elif "${functionName}" == "twoSum":
                nums = input_data.get("nums", [])
                target = input_data.get("target", 0)
                result = solution.twoSum(nums, target)
                if not print_result(i, result, expected):
                    all_passed = False

            elif "${functionName}" == "isValid":
                s = input_data
                result = solution.isValid(s)
                if not print_result(i, result, expected):
                    all_passed = False

            elif "${functionName}" == "climbStairs":
                n = input_data
                result = solution.climbStairs(n)
                if not print_result(i, result, expected):
                    all_passed = False

            elif "${functionName}" == "bestTimeToBuyAndSellStock":
                prices = input_data
                result = solution.bestTimeToBuyAndSellStock(prices)
                if not print_result(i, result, expected):
                    all_passed = False

            else:
                print(f"⚠️ Unsupported functionName: ${functionName}")
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
#include <unordered_map>
#include <stack>
#include <string>
#include <climits>
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

int main() {
    bool allPassed = true;
    Solution solution;

${testCases
  .map((test, i) => {
    const input = test.input || {};
    const expected = test.expectedOutput || 0;

    if (functionName === "maximumSubarray") {
      const nums = formatArray(input || []);
      console.log("input :", input);
      return `
{
      vector<int> nums = ${nums};
    int result = solution.${functionName}(nums); // ✅ Return type is int
    int expected = ${expected};

    if (result == expected) {
        cout << "✅ Test Case ${i + 1}: Passed\\n";
        cout << "Expected: " << expected << "\\n";
        cout << "Got: " << result << "\\n";
    } else {
        cout << "❌ Test Case ${i + 1}: Failed\\n";
        cout << "Expected: " << expected << "\\n";
        cout << "Got: " << result << "\\n";
        allPassed = false;
    }
}`;
    }

    // if (functionName === "maximumSubarray") {
    //   const nums = formatArray(input || input.nums || []);
    //   console.log("input:", input);
    //   console.log("input:");
    //   return `
    // {
    //     vector<int> nums = ${nums};
    //     int result = solution.${functionName}(nums);
    //     int expected = ${expected};
    //     if (result == expected) {
    //         cout << "✅ Test Case ${i + 1}: Passed\\n";
    //     } else {
    //         cout << "❌ Test Case ${i + 1}: Failed\\n";
    //         cout << "Expected: " << expected << "\\n";
    //         cout << "Got: " << result << "\\n";
    //         allPassed = false;
    //     }
    // }`;
    // }
    if (functionName === "twoSum") {
      const input = test.input || {};
      const expectedStr = formatArray(test.expectedOutput || []);
      const nums = formatArray(input.nums || []);
      const target = input.target ?? 0;
      return `
    {
        vector<int> nums = ${nums};
        int target = ${target};
        vector<int> result = solution.${functionName}(nums, target);
        vector<int> expected = ${expectedStr};
        
       if (result == expected) {
            cout << "✅ Test Case ${i + 1}: Passed\\n";
            cout << "Expected: ", 
            printVector(expected); 
            cout << "\\n";
            cout << "Got: ";
           printVector(result);
             cout << "\\n";
        } else {
            cout << "❌ Test Case ${i + 1}: Failed\\n";
            cout << "Expected: ", printVector(expected);
            cout << "\\n";
            cout << "Got: ";
            printVector(result);
            cout << "\\n";
            allPassed = false;
        }
    }`;
    }

    if (functionName === "isValid") {
      // bool expected = ${expected === true ? "true" : "false"};
      return `
    {
        string s = "${input}";
        bool result = solution.isValid(s);
        bool expected = ${JSON.stringify(expected)};

        if (result == expected) {
            cout << "✅ Test Case ${i + 1}: Passed\\n";
            cout << "Expected: " << (expected ? "true" : "false") << "\\n";
            cout << "Got: " << (result ? "true" : "false") << "\\n";
        } else {
            cout << "❌ Test Case ${i + 1}: Failed\\n";
            cout << "Expected: " << (expected ? "true" : "false") << "\\n";
            cout << "Got: " << (result ? "true" : "false") << "\\n";
            allPassed = false;
        }
    }`;
    }

    if (functionName === "climbStairs") {
      return `
    {
        int n = ${input};
        int result = solution.climbStairs(n);
        int expected = ${expected};
        if (result == expected) {
            cout << "✅ Test Case ${i + 1}: Passed\\n";
            cout << "Expected: " << expected << "\\n";
            cout << "Got: " << result << "\\n";
        } else {
            cout << "❌ Test Case ${i + 1}: Failed\\n";
            cout << "Expected: " << expected << "\\n";
            cout << "Got: " << result << "\\n";
            allPassed = false;
        }
    }`;
    }
    if (functionName === "bestTimeToBuyAndSellStock") {
      const prices = formatArray(input || []);
      console.log(prices);
      return `
    {
        vector<int> prices = ${prices};
        int result = solution.bestTimeToBuyAndSellStock(prices);
        int expected = ${expected};
        if (result == expected) {
            cout << "✅ Test Case ${i + 1}: Passed\\n";
            cout << "Expected: " << expected << "\\n";
            cout << "Got: " << result << "\\n";
        } else {
            cout << "❌ Test Case ${i + 1}: Failed\\n";
            cout << "Expected: " << expected << "\\n";
            cout << "Got: " << result << "\\n";
            allPassed = false;
        }
    }`;
    }

    return `
    {
        // fallback if nothing matches
        cout << "⚠️ Unsupported functionName: ${functionName}\\n";
    }`;
  })
  .join("\n")}

   

    return 0;
}
`;

      //       const javaWrapper = `
      // ${safeCode}
      // public class Main {
      //   public static void main(String[] args) {
      //     boolean allPassed = true;
      //     Solution solution = new Solution();

      // ${testCases
      //   .map((test, i) => {
      //     const input = test.input;
      //     const expected = test.expectedOutput;

      //     let numsArray = "new int[]{}";
      //     let target = 0;

      //     if (
      //       typeof input === "object" &&
      //       input !== null &&
      //       Array.isArray(input.nums)
      //     ) {
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

      const formatArrayForJava = (arr) =>
        Array.isArray(arr) ? `{${arr.join(", ")}}` : "{}";

      //       const javaWrapper = `
      // import java.util.*;

      // public class Main {

      //     public static void main(String[] args) {
      //         boolean allPassed = true;
      //         Solution solution = new Solution();

      // ${testCases
      //   .map((test, i) => {
      //     const input = test.input || {};
      //     const expected = test.expectedOutput;

      //     if (functionName === "twoSum") {
      //       const nums = formatArrayForJava(input.nums || []);
      //       const target = input.target ?? 0;
      //       return `
      //         {
      //             int[] nums = ${nums};
      //             int target = ${target};
      //             int[] result = solution.twoSum(nums, target);
      //             int[] expected = ${formatArrayForJava(expected)};
      //             if (Arrays.equals(result, expected)) {
      //                 System.out.println("✅ Test Case ${i + 1}: Passed");
      //                 System.out.println("Expected: " + Arrays.toString(expected));
      //                 System.out.println("Got: " + Arrays.toString(result));
      //             } else {
      //                 System.out.println("❌ Test Case ${i + 1}: Failed");
      //                 System.out.println("Expected: " + Arrays.toString(expected));
      //                 System.out.println("Got: " + Arrays.toString(result));
      //                 allPassed = false;
      //             }
      //         }
      //       `;
      //     }

      //     if (functionName === "maximumSubarray") {
      //       const nums = formatArrayForJava(input || []);
      //       return `
      //         {
      //             int[] nums = ${nums};
      //             int result = solution.maximumSubarray(nums);
      //             int expected = ${expected};
      //             if (result == expected) {
      //                 System.out.println("✅ Test Case ${i + 1}: Passed");
      //                 System.out.println("Expected: " + expected);
      //                 System.out.println("Got: " + result);
      //             } else {
      //                 System.out.println("❌ Test Case ${i + 1}: Failed");
      //                 System.out.println("Expected: " + expected);
      //                 System.out.println("Got: " + result);
      //                 allPassed = false;
      //             }
      //         }
      //       `;
      //     }

      //     if (functionName === "climbStairs") {
      //       const n = input;
      //       return `
      //         {
      //             int n = ${n};
      //             int result = solution.climbStairs(n);
      //             int expected = ${expected};
      //             if (result == expected) {
      //                 System.out.println("✅ Test Case ${i + 1}: Passed");
      //             } else {
      //                 System.out.println("❌ Test Case ${i + 1}: Failed");
      //                 System.out.println("Expected: " + expected);
      //                 System.out.println("Got: " + result);
      //                 allPassed = false;
      //             }
      //         }
      //       `;
      //     }

      //     if (functionName === "isValid") {
      //       const s = input;
      //       return `
      //         {
      //             String s = "${s}";
      //             boolean result = solution.isValid(s);
      //             boolean expected = ${expected};
      //             if (result == expected) {
      //                 System.out.println("✅ Test Case ${i + 1}: Passed");
      //             } else {
      //                 System.out.println("❌ Test Case ${i + 1}: Failed");
      //                 System.out.println("Expected: " + expected);
      //                 System.out.println("Got: " + result);
      //                 allPassed = false;
      //             }
      //         }
      //       `;
      //     }

      //     if (functionName === "bestTimeToBuyAndSellStock") {
      //       const prices = formatArrayForJava(input || []);
      //       return `
      //         {
      //             int[] prices = ${prices};
      //             int result = solution.bestTimeToBuyAndSellStock(prices);
      //             int expected = ${expected};
      //             if (result == expected) {
      //                 System.out.println("✅ Test Case ${i + 1}: Passed");
      //             } else {
      //                 System.out.println("❌ Test Case ${i + 1}: Failed");
      //                 System.out.println("Expected: " + expected);
      //                 System.out.println("Got: " + result);
      //                 allPassed = false;
      //             }
      //         }
      //       `;
      //     }

      //     return `
      //         {
      //             System.out.println("⚠️ Unsupported function: ${functionName}");
      //             allPassed = false;
      //         }
      //     `;
      //   })
      //   .join("\n")}

      //         if (allPassed) {
      //             System.out.println("FINAL_STATUS: solved");
      //         } else {
      //             System.out.println("FINAL_STATUS: attempted");
      //         }
      //     }
      // }
      // `;

      const javaWrapper = `
import java.util.*;

public class Main {

    public static void main(String[] args) {
        boolean allPassed = true;
        Solution solution = new Solution();

${testCases
  .map((test, i) => {
    const input = test.input || {};
    const expected = test.expectedOutput;

    if (functionName === "twoSum") {
      const nums = formatArrayForJava(input.nums || []);
      const target = input.target ?? 0;
      return `
        {
            int[] nums = ${nums};
            int target = ${target};
            int[] result = solution.twoSum(nums, target);
            int[] expected = ${formatArrayForJava(expected)};
            
            boolean passed = result != null && expected != null 
                             && result.length == expected.length 
                             && Arrays.equals(result, expected);

            if (passed) {
                System.out.println("✅ Test Case ${i + 1}: Passed");
                System.out.println("Expected: " + Arrays.toString(expected));
                System.out.println("Got: " + Arrays.toString(result));
            } else {
                System.out.println("❌ Test Case ${i + 1}: Failed");
                System.out.println("Expected: " + Arrays.toString(expected));
                System.out.println("Got: " + Arrays.toString(result));
                allPassed = false;
            }
        }
      `;
    }

    return `
        {
            System.out.println("⚠️ Unsupported function: ${functionName}");
            allPassed = false;
        }
    `;
  })
  .join("\n")}

        if (allPassed) {
            System.out.println("FINAL_STATUS: solved");
        } else {
            System.out.println("FINAL_STATUS: attempted");
        }
    }
}

// 👇 Java Solution class must be included for successful compilation

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }

        return new int[0];
    }
}
`;

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
        language: langInfo.piston,
        code: codeToRun,
        filename: langInfo.filename,
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
          submittedCode: finalSubmittedCode,
        };
        console.log("💾 Submitting code:", {
          languageId,
          submittedCode: finalSubmittedCode,
          output,
        });

        try {
          const { data } = await axios.post(
            "http://localhost:8080/submission",
            payload,
            { withCredentials: true }
          );

          const { success, message } = data;
          console.log(data);
          if (success === true || success === "true") {
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
      const languageLabelMap = {
        javascript: "js",
        python: "python",
        cpp: "cpp",
        java: "java",
      };

      const selectedLang = languageLabelMap[languageId] || "txt";
      console.log(promptToSend);
      // if (promptToSend === "Explain My Code" &&
      //   !currentCode || currentCode.trim().length < 5) {
      //   alert("Editor is empty! Please write some code.");
      //   return;
      // }
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
      console.log("🧪 Prompt sent to AI:\n", fullPrompt);

      const response = await axios.post("http://localhost:8080/ask", {
        prompt: fullPrompt,
        userprompt: promptToSend,
        questionTitle: question.title,
        questionDescription: question.description,
        userCode: submittedCode,
      });
      console.log("currentCode : ", currentCode);

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
    // Clear AI chat history whenever a new question is loaded
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
  // console.log("🧪 Raw msg.ai:", msg.ai);
  // console.log("🧪 Type:", typeof msg.ai);

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
          <option value={62}>Java</option>
          <option value={63}>C++</option>
          <option value={71}>Python</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <CodeEditor
          code={submittedCode}
          setCode={setSubmittedCode}
          onCodeChange={(updatedCode) => {
            setCurrentCode(updatedCode);
            console.log("🔥 Code in EditorSide:", updatedCode);
          }}
        />
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
          <div
            onClick={() => setShowAI(!showAI)}
            className="fixed bottom-5 cursor-pointer right-5 bg-[#00d1b2] text-white px-5 py-2 rounded-full shadow-2xl hover:bg-cyan-800 z-50"
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
