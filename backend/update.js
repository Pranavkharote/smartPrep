const mongoose = require("mongoose");
// const QuestionModel = require("./models/QuestionModel"); // Adjust path if needed

// const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pranavkharote2005:yIu2UqnJOVU8qzJO@cluster0.bnd1w.mongodb.net/SmartPrep", {
  dbName: "SmartPrep" // make sure DB name is correct
}).then(() => {
  console.log("✅ MongoDB connected successfully");
  insertQuestions(); // call insertion after connection
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});
const QuestionModel = require("./models/QuestionModel"); // your path

async function insertQuestions() {
  try {
    await QuestionModel.insertMany(questions);
    console.log("✅ Questions inserted successfully");
  } catch (err) {
    console.error("❌ Insert failed:", err);
  }
}

const questions = [
  {
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Each input has exactly one solution.",
    difficulty: "Easy",
    functionName: "twoSum",
    solution: `
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};
    `,
    explaination: "We use a hash map to find the complement of each number while iterating once.",
    stepByStepGuide: [
      "Initialize a hash map.",
      "Loop through the array.",
      "Check if target - current number exists in the map.",
      "If yes, return the pair of indices.",
      "Else, store the current number and its index."
    ],
    tags: ["Array", "Hash Table"],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] }
    ],
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nExactly one solution exists.",
    youtubeSolutionURL: "https://www.youtube.com/watch?v=KLlXCFG5TnA"
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "Find the maximum profit from buying and selling a stock given daily prices. You must buy before you sell.",
    difficulty: "Easy",
    functionName: "bestTimeToBuyAndSellStock",
    solution: `
var bestTimeToBuyAndSellStock = function(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }
  return maxProfit.toString();
};
    `,
    explaination: "Track minimum price so far and compute max profit at each step.",
    stepByStepGuide: [
      "Initialize minPrice = Infinity and maxProfit = 0.",
      "Iterate over prices.",
      "Update minPrice if current price is lower.",
      "Update maxProfit if price - minPrice is greater."
    ],
    tags: ["Greedy", "Array"],
    testCases: [
      { input: [7, 1, 5, 3, 6, 4], expectedOutput: "5" },
      { input: [7, 6, 4, 3, 1], expectedOutput: "0" },
      { input: [2, 4, 1], expectedOutput: "2" }
    ],
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    youtubeSolutionURL: "https://www.youtube.com/watch?v=1pkOgXD63yU"
  },
  {
    title: "Maximum Subarray",
    description: "Find the contiguous subarray within a one-dimensional array of numbers which has the largest sum.",
    difficulty: "Medium",
    functionName: "maximumSubarray",
    solution: `
var maximumSubarray = function(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum.toString();
};
    `,
    explaination: "Kadane’s algorithm tracks local and global maximum sums efficiently.",
    stepByStepGuide: [
      "Initialize currentSum and maxSum to first element.",
      "Iterate from index 1 onward.",
      "Update currentSum = max(current element, currentSum + element).",
      "Update maxSum = max(maxSum, currentSum)."
    ],
    tags: ["Dynamic Programming", "Array"],
    testCases: [
      { input: [-2,1,-3,4,-1,2,1,-5,4], expectedOutput: "6" },
      { input: [1], expectedOutput: "1" },
      { input: [5,4,-1,7,8], expectedOutput: "23" }
    ],
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    youtubeSolutionURL: "https://www.youtube.com/watch?v=5WZl3MMT0Eg"
  },
  {
    title: "Valid Parentheses",
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    functionName: "isValid",
    solution: `
var isValid = function(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  for (let ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
};
    `,
    explaination: "Use a stack to track open brackets and match with closing ones.",
    stepByStepGuide: [
      "Initialize an empty stack.",
      "For each character, push if open bracket.",
      "If close bracket, pop and check match.",
      "Return true if stack is empty at end."
    ],
    tags: ["Stack", "String"],
    testCases: [
      { input: "()", expectedOutput: true },
      { input: "()[]{}", expectedOutput: true },
      { input: "(]", expectedOutput: false }
    ],
    constraints: "1 <= s.length <= 10^4\nOnly '(', ')', '{', '}', '[' and ']' are allowed.",
    youtubeSolutionURL: "https://www.youtube.com/watch?v=WTzjTskDFMg"
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. Return how many distinct ways you can climb to the top.",
    difficulty: "Easy",
    functionName: "climbStairs",
    solution: `
var climbStairs = function(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b.toString();
};
    `,
    explaination: "This is a Fibonacci problem, where total ways = ways(n-1) + ways(n-2).",
    stepByStepGuide: [
      "Start with base cases: 1 step → 1 way, 2 steps → 2 ways.",
      "Iteratively compute ways from 3 to n.",
      "Use two variables to save space.",
      "Return the final computed number."
    ],
    tags: ["Dynamic Programming", "Math"],
    testCases: [
      { input: 2, expectedOutput: "2" },
      { input: 3, expectedOutput: "3" },
      { input: 5, expectedOutput: "8" }
    ],
    constraints: "1 <= n <= 45",
    youtubeSolutionURL: "https://www.youtube.com/watch?v=Y0lT9Fck7qI"
  }
];
