import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

export const runCodeWithPiston = async ({ language, code, stdin = "" }) => {
  try {
    const response = await axios.post(PISTON_URL, {
      language: language,
      version: "*", // Always required
      files: [
        {
          content: code?.toString() || "",
        },
      ],
      stdin,
    });

    return response.data;
  } catch (err) {
    console.error("❌ Piston API error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to run code.");
  }
};
