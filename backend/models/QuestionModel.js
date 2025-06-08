const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  solution: String,
  explaination: String,
  stepByStepGuide: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  testCases: [
    {
      input: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      expectedOutput: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

module.exports = QuestionModel;
