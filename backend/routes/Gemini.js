const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const Gemini = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(Gemini);

router.post("/ask", async (req, res) => {
  const { prompt, questionTitle, questionDescription  } = req.body;

  if (!prompt || !questionDescription) {
    return res.status(400).json({
      success: false,
      message: "Prompt and question are required",
    });
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const finalPrompt = `You are helping a studnet solve this coding question:
    **Title**: ${questionTitle}
    **Description**: ${questionDescription}
    Now, the user asks: ${prompt}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();
    res.json({ success: "true", answer: text });
  } catch (error) {
    console.error("Error from GEMINI:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong to GEMINI.",
    });
  }
});

module.exports = router;
