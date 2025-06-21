export const wrapCode = (language, userCode, testCases) => {
  switch (language) {
    case "javascript":
      return wrapJs(userCode, testCases);
    case "python":
      return wrapPython(userCode, testCases);
    case "cpp":
      return wrapCpp(userCode, testCases);
    case "java":
      return wrapJava(userCode, testCases);
    default:
      return userCode;
  }
};

// ✅ JavaScript Wrapper
const wrapJs = (userCode, testCases) => {
  const tests = testCases
    .map(
      (tc, i) => `
  if (${tc.call} === ${tc.expected}) {
    console.log("✅ Test ${i + 1} passed");
  } else {
    console.log("❌ Test ${i + 1} failed");
  }`
    )
    .join("\n");

  return `
${userCode}

try {
${tests}
} catch (e) {
  console.log("❌ Runtime Error:", e.message);
}
`;
};

// ✅ Python Wrapper
const wrapPython = (userCode, testCases) => {
  const tests = testCases
    .map((tc, i) => `  assert ${tc.call} == ${tc.expected}  # Test ${i + 1}`)
    .join("\n");

  return `
${userCode}

try:
${tests}
  print("✅ All test cases passed!")
except AssertionError:
  print("❌ Test case failed")
`;
};

// ✅ C++ Wrapper
const wrapCpp = (userCode, testCases) => {
  const tests = testCases
    .map((tc, i) => `  assert(${tc.call} == ${tc.expected}); // Test ${i + 1}`)
    .join("\n");

  return `
#include <iostream>
#include <cassert>
using namespace std;

${userCode}

int main() {
${tests}
  cout << "✅ All test cases passed!" << endl;
  return 0;
}
`;
};

// ✅ Java Wrapper
const wrapJava = (userCode, testCases) => {
  const tests = testCases
    .map(
      (tc, i) => `
if (${tc.call} == ${tc.expected}) {
  System.out.println("✅ Test ${i + 1} passed");
} else {
  System.out.println("❌ Test ${i + 1} failed");
}`
    )
    .join("\n");

  return `
${userCode}

public class Main {
  public static void main(String[] args) {
    ${tests}
  }
}
`;
};
