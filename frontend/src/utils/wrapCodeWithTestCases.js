export    const wrapCodeWithTests = (submittedCode, question, languageId) => {
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