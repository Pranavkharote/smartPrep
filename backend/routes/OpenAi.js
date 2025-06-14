const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required",
    });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "user", // Always 'user' here
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiText =
      response.data.choices?.[0]?.message?.content || "No response from AI.";

    res.status(200).json({
      success: true,
      answer: aiText,
    });
  } catch (error) {
    console.error("Error from OpenAI:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while talking to OpenAI.",
    });
  }
});

module.exports = router;
