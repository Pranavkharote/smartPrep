// import axios from "axios";

// const BASE_URL = "https://judge0-ce.p.rapidapi.com";

// const options = {
//   headers: {
//     "X-RapidAPI-Key": "e97e908f38msh5077b97b6a0425ap14862ajsnde468232f597",
//     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//     "Content-Type": "application/json",
//   },
// };

// // Fetch list of languages
// export const fetchLanguages = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/languages`, options);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching languages:", error);
//     return [];
//   }
// };

// const toBase64 = (str) => {
//   return btoa(
//     encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
//       String.fromCharCode("0x" + p1)
//     )
//   );
// };

// // Submit code for execution
// export const submitCode = async ({ source_code, language_id, stdin }) => {
//   try {
//     const encodedSource = toBase64(source_code);
//     const encodedStdin = toBase64(stdin || "");

//     const response = await axios.post(
//       `${BASE_URL}/submissions?base64_encoded=true&wait=true`,
//       { source_code: encodedSource, language_id, stdin: encodedStdin },
//       options
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error submitting code:", error);
//     return null;
//   }
// };

import axios from "axios";

const BASE_URL = "https://judge0-ce.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Key": "e97e908f38msh5077b97b6a0425ap14862ajsnde468232f597",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

// Helper to Base64 encode string
const toBase64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Helper to decode Base64 string
const fromBase64 = (str) => {
  return decodeURIComponent(escape(atob(str)));
};

// Fetch list of supported languages
export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/languages`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

// Submit code for execution
export const submitCode = async ({ source_code, language_id, stdin }) => {
  // try {
  //   const response = await axios.post(
  //     `${BASE_URL}/submissions?base64_encoded=true&wait=true`,
  //     {
  //       source_code: toBase64(source_code),
  //       language_id: language_id,
  //       stdin: toBase64(stdin || ""),
  //     },
  //     options
  //   );

  //   // Decode response output fields
  //   const { stdout, stderr, compile_output, message } = response.data;

  //   return {
  //     ...response.data,
  //     stdout: stdout ? fromBase64(stdout) : null,
  //     stderr: stderr ? fromBase64(stderr) : null,
  //     compile_output: compile_output ? fromBase64(compile_output) : null,
  //     message: message ? fromBase64(message) : null,
  //   };
  // } catch (error) {
  //   console.error("Error submitting code:", error);
  //   return null;
  // }
  try {
    const response = await axios.post(
      `${BASE_URL}/submissions?base64_encoded=true&wait=true`,
      {
        source_code: toBase64(source_code),
        language_id: language_id,
        stdin: toBase64(stdin || ""),
      },
      options
    );

    return response.data; // NO decoding
  } catch (error) {
    console.error("Error submitting code:", error);
    return null;
  }
};
