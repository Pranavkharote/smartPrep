const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const authenticateUser = require("../middlewares/AuthMiddleware");

const Gemini = process.env.GEMINI_API_KEY?.trim();
const genAI = Gemini ? new GoogleGenerativeAI(Gemini) : null;

const askGeminiWithFallback = async (finalPrompt) => {
  const modelCandidates = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
  ];

  let lastError = null;

  for (const modelName of modelCandidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      lastError = err;
      const msg = err?.message || "";
      const modelIssue =
        err?.status === 404 ||
        err?.status === 400 ||
        /model|not found|unsupported|permission/i.test(msg);

      if (!modelIssue) break;
    }
  }

  throw lastError;
};

console.log("RENDER ENV CHECK:", {
  exists: !!process.env.GEMINI_API_KEY,
  length: process.env.GEMINI_API_KEY?.length,
});


router.post("/ask", authenticateUser, async (req, res) => {
  const { prompt, questionTitle, questionDescription  } = req.body;

  if (!prompt || !questionDescription) {
    return res.status(400).json({
      success: false,
      message: "Prompt and question are required",
    });
  }

  if (!genAI) {
    return res.status(500).json({
      success: false,
      message: "GEMINI_API_KEY missing on server",
    });
  }

  try {
    const finalPrompt = `You are helping a studnet solve this coding question:
    **Title**: ${questionTitle}
    **Description**: ${questionDescription}
    Now, the user asks: ${prompt}`;

    const text = await askGeminiWithFallback(finalPrompt);
    res.json({ success: "true", answer: text });
  } catch (error) {
    const detail =
      error?.response?.data?.error?.message ||
      error?.response?.data ||
      error?.message ||
      "Unknown GEMINI error";
    const statusCode = Number(error?.status) || 500;

    console.error("Error from GEMINI:", detail);
    res.status(statusCode >= 400 && statusCode < 600 ? statusCode : 500).json({
      success: false,
      message: "Something went wrong to GEMINI.",
      detail,
    });
  }
});

module.exports = router;
