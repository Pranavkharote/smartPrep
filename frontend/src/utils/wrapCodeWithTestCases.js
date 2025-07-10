export const wrapCodeWithTests = (submittedCode, question, languageId) => {
  const { functionName, testCases } = question;

  //   const jsWrapper = `
  // ${submittedCode}

  // if (typeof ${functionName} !== "function") {
  //   console.log("error\\n❌ Function '${functionName}' is not defined properly.");
  // } else {
  //   const testCases = ${JSON.stringify(testCases)};
  //   let allPassed = true;

  //   testCases.forEach((test, index) => {
  //     try {

  //      const args =
  //   typeof test.input === 'object' && !Array.isArray(test.input)
  //     ? Object.values(test.input)
  //     : [test.input];

  //       const expected = test.expectedOutput;

  //       const result = ${functionName}(...args);
  //       const passed = JSON.stringify(result) === JSON.stringify(expected);

  //       if (passed) {
  //         console.log(\`✅ Test Case \${index + 1}: Passed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
  //       } else {
  //         console.log(\`❌ Test Case \${index + 1}: Failed\\nExpected: \${JSON.stringify(expected)}\\nGot: \${JSON.stringify(result)}\`);
  //         allPassed = false;
  //       }
  //     } catch (e) {
  //       console.log(\`❌ Test Case \${index + 1}: Crashed - \${e.message}\`);
  //       allPassed = false;
  //     }
  //   });

  //   if (allPassed) {
  //     console.log("FINAL_STATUS: solved");
  //   } else {
  //     console.log("FINAL_STATUS: attempted");
  //   }
  // }
  // `;

  const jsWrapper = `
${submittedCode}

if (typeof ${functionName} !== "function") {
  console.log("error\\n❌ Function '${functionName}' is not defined properly.");
} else {
  const testCases = ${JSON.stringify(testCases)};
  let allPassed = true;

  testCases.forEach((test, index) => {
    try {
      let args;

      if (typeof test.input === 'object' && !Array.isArray(test.input)) {
        // Special handling for known structured input
        if ('nums1' in test.input && 'nums2' in test.input) {
          args = [test.input.nums1, test.input.nums2];
        } else {
          args = Object.values(test.input);
        }
      } else {
        args = [test.input];
      }

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

//   const pythonWrapper = `
// ${submittedCode}

// def run_tests():
//     all_passed = True
//     test_cases = ${JSON.stringify(testCases)}
//     solution = Solution()

//     def normalize(x):
//         if isinstance(x, str) and x.isdigit():
//             return int(x)
//         if isinstance(x, str):
//             x = x.lower()
//             if x == "true":
//                 return True
//             if x == "false":
//                 return False
//             return x
//         if isinstance(x, (bool, int, float)):
//             return x
//         if isinstance(x, list):
//             return [normalize(i) for i in x]
//         return x

//     def print_result(i, result, expected):
//         if normalize(result) == normalize(expected):
//             print(f"✅ Test Case {i+1}: Passed\\nExpected: {expected}\\nGot: {result}")
//             return True
//         else:
//             print(f"❌ Test Case {i+1}: Failed\\nExpected: {expected}\\nGot: {result}")
//             return False

//     for i, test in enumerate(test_cases):
//         try:
//             input_data = test["input"]
//             expected = test["expectedOutput"]

//             if "${functionName}" == "maximumSubarray":
//                 result = solution.maximumSubarray(input_data)
//                 if not print_result(i, result, expected):
//                     all_passed = False

//             elif "${functionName}" == "twoSum":
//                 nums = input_data.get("nums", [])
//                 target = input_data.get("target", 0)
//                 result = solution.twoSum(nums, target)
//                 if not print_result(i, result, expected):
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
            
//            elif "${functionName}" == "findMedianSortedArrays":
//                 nums1 = input_data.get("nums1", [])
//                 nums2 = input_data.get("nums2", [])
//                 result = solution.findMedianSortedArrays(nums1, nums2)
    
//                 def float_equal(a, b, tol=1e-6):
//                 return abs(a - b) < tol

//               if isinstance(expected, float) and isinstance(result, float):
//               if not float_equal(result, expected):
//             print_result(i, result, expected)
//             all_passed = False
    

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

    def float_equal(a, b, tol=1e-6):
        return abs(a - b) < tol

    def print_result(i, result, expected):
        if isinstance(expected, float) and isinstance(result, float):
            if float_equal(result, expected):
                print(f"✅ Test Case {i+1}: Passed\\nExpected: {expected}\\nGot: {result}")
                return True
            else:
                print(f"❌ Test Case {i+1}: Failed\\nExpected: {expected}\\nGot: {result}")
                return False
        elif normalize(result) == normalize(expected):
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

            elif "${functionName}" == "findMedianSortedArrays":
                nums1 = input_data.get("nums1", [])
                nums2 = input_data.get("nums2", [])
                result = solution.findMedianSortedArrays(nums1, nums2)
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

  function formatArrayForJava(arr) {
    return `new int[]{${arr.join(", ")}}`;
  }

  function javaWrapper(userCode, testCases, functionName) {
    const testCode = testCases
      .map((test, i) => {
        const input = test.input || {};
        const expected = test.expectedOutput;

        if (functionName === "twoSum") {
          const nums = formatArrayForJava(input.nums || []);
          const target = input.target ?? 0;
          const expectedArr = formatArrayForJava(expected);

          return `
        {
            int[] nums = ${nums};
            int target = ${target};
            int[] result = solution.${functionName}(nums, target);
            int[] expected = ${expectedArr};

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

        return `System.out.println("⚠️ Unsupported function: ${functionName}");`;
      })
      .join("\n");

    return `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        boolean allPassed = true;
        Solution solution = new Solution();

${testCode}

        if (allPassed) {
            System.out.println("FINAL_STATUS: solved");
        } else {
            System.out.println("FINAL_STATUS: attempted");
        }
    }
}

${userCode}
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
