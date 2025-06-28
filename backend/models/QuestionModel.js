const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  functionName: {
    type: String,
    required: true,
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
  constraints: String,
  youtubeSolutionURL: String
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

module.exports = QuestionModel;
