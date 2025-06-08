const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["attempted", "solved", "skipped"],
  },
  submittedCode: String,
  timeTaken: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});


const UserProgressModel = mongoose.model("UserProgress", UserProgressSchema);

module.exports = UserProgressModel;
